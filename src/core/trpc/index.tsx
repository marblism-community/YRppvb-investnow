'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, useState } from 'react'
import { Api, createTrpcClient } from './internal/trpc.client'

type Props = { children: ReactNode }

export const TRPCProvider: React.FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() => createTrpcClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </Api.Provider>
    </QueryClientProvider>
  )
}

export * from './internal/trpc.client'
