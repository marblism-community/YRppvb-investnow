'use client'

import { UserProvider } from '@/core/context'
import { TRPCProvider } from '@/core/trpc'
import { DesignSystemProvider } from '@/designSystem'
import { SessionProvider } from 'next-auth/react'

type Props = { children: React.ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <DesignSystemProvider>
      <SessionProvider>
        <TRPCProvider>
          <UserProvider>{children}</UserProvider>
        </TRPCProvider>
      </SessionProvider>
    </DesignSystemProvider>
  )
}
