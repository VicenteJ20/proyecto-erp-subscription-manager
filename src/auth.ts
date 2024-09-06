import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { prisma } from './lib/prisma'
import Resend from 'next-auth/providers/resend'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Resend({
    from: 'onboarding@resend.dev',
  })]
})