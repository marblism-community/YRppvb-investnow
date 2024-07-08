import { createTRPCReact } from '@/.marblism/api/client/react'
import { Configuration } from '@/core/configuration'
import { AppRouter } from '@/server'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'

export const Api = createTRPCReact<AppRouter>()

const transformer = superjson

export const createTrpcClient = () => {
  return Api.createClient({
    transformer,
    links: [
      loggerLink({
        enabled: op =>
          Configuration.isDevelopment() ||
          (op.direction === 'down' && op.result instanceof Error),
      }),
      unstable_httpBatchStreamLink({
        url: Configuration.getBaseUrl() + '/api/trpc',
        headers: options => {
          const headers = new Headers()
          headers.set('x-trpc-source', 'react')
          return Object.fromEntries(headers.entries())
        },
      }),
    ],
  })
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>
