import { Configuration } from '@/core/configuration'
import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import * as Bcrypt from 'bcryptjs'
import * as Jwt from 'jsonwebtoken'
import { z } from 'zod'
import { EmailService } from '../libraries/email'

export const AuthenticationRouter = Trpc.createRouter({
  register: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        pictureUrl: z.string().optional(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password)

      const userExisting = await ctx.databaseUnprotected.user.findUnique({
        where: { email: input.email },
      })

      if (userExisting) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email is not available',
        })
      }

      const passwordHashed = hashPassword(input.password)

      const user = await ctx.databaseUnprotected.user.create({
        data: { ...input, password: passwordHashed },
      })

      return { id: user.id }
    }),

  sendResetPasswordEmail: Trpc.procedurePublic
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { email: input.email },
      })

      const payload = { userId: user.id }

      const secret = Configuration.getAuthenticationSecret()

      const TIME_24_HOURS = 60 * 60 * 24

      const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS })

      const url = Configuration.getBaseUrl()

      const urlResetPassword = `${url}/reset-password/${token}`

      const type = EmailService.Type.AUTHENTICATION_FORGOT_PASSWORD

      try {
        await EmailService.send({
          type,
          email: user.email,
          name: user.name ?? user.email,
          subject: `Reset your password`,
          variables: {
            url_password_reset: urlResetPassword,
          },
        })

        return { success: true }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not send the email',
        })
      }
    }),

  resetPassword: Trpc.procedurePublic
    .input(z.object({ token: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password)

      const secret = Configuration.getAuthenticationSecret()

      let decoded: { userId: string }

      try {
        decoded = Jwt.verify(input.token, secret)
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token is invalid',
        })
      }

      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { id: decoded.userId },
      })

      const passwordHashed = hashPassword(input.password)

      await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: {
          password: passwordHashed,
        },
      })

      return { success: true }
    }),
})

const checkPassword = (password: string) => {
  const isValid = password?.length >= 6

  if (isValid) {
    return
  }

  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Password must have at least 6 characters.',
  })
}

const hashPassword = (password: string) => {
  const saltRounds = 10
  const salt = Bcrypt.genSaltSync(saltRounds)
  const passwordHashed = Bcrypt.hashSync(password, salt)

  return passwordHashed
}
