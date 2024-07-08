import { PrismaAdapter } from '@auth/prisma-adapter'
import type { PrismaClient, Role } from '@prisma/client'
import * as Bcrypt from 'bcryptjs'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DatabaseUnprotected } from '../database/internal/unproteced'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      roles: Role[] // Adjust the type to match your roles model
    } & DefaultSession['user']
  }
}

const providers: Provider[] = [
  CredentialsProvider({
    credentials: {
      email: { type: 'email' },
      password: { type: 'password' },
    },
    authorize: authorize(DatabaseUnprotected),
  }),
  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
]

const providerMap = providers.map(provider => {
  const isActive =
    provider?.options?.clientId || provider?.options?.clientSecret

  return { id: provider?.id, name: provider?.name, active: isActive }
})

const cookiePrefix = '__Secure-'

const sameSite: 'none' | 'lax' =
  process.env.NODE_ENV === 'development' ? 'none' : 'lax'

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!

        const user = await DatabaseUnprotected.user.findUnique({
          where: { id: token.sub },
          include: {
            roles: true,
          },
        })

        if (user) {
          session.user.roles = user.roles
        }
      }
      return session
    },
  },
  adapter: PrismaAdapter(DatabaseUnprotected) as Adapter,
  providers: providers,
  pages: {
    signIn: '/login',
    signOut: '/profile',
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: sameSite,
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: sameSite,
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: sameSite,
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: sameSite,
        path: '/',
        secure: true,
        maxAge: 900,
      },
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: sameSite,
        path: '/',
        secure: true,
        maxAge: 900,
      },
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: sameSite,
        path: '/',
        secure: true,
      },
    },
  },
}

function authorize(prisma: PrismaClient) {
  return async (
    credentials: Record<'email' | 'password', string> | undefined,
  ) => {
    if (!credentials) {
      throw new Error('Missing credentials')
    }

    if (!credentials.email) {
      throw new Error('"email" is required in credentials')
    }

    if (!credentials.password) {
      throw new Error('"password" is required in credentials')
    }

    const user = await prisma.user.findFirst({
      where: { email: credentials.email },
      select: { id: true, email: true, password: true },
    })

    if (!user?.password) {
      return null
    }

    // verify the input password with stored hash
    const isValid = await Bcrypt.compare(credentials.password, user.password)

    if (!isValid) {
      return null
    }

    return { id: user.id, email: user.email }
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
const getServerAuthSession = () => getServerSession(options)

export const Authentication = {
  providers: providerMap,
  getSession: getServerAuthSession,
  options,
}
