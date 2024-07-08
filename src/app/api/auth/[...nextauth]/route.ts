import { Authentication } from '@/core/authentication'
import NextAuth from 'next-auth'

const handler = NextAuth(Authentication.options)

export { handler as GET, handler as POST }
