import { Configuration } from '@/core/configuration'
import { Trpc } from '@/core/trpc/server'
import { Server } from '@/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: Server.appRouter,
    createContext: () => Trpc.createContext({ req }),
    onError: Configuration.isDevelopment
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
          )
        }
      : undefined,
  })

export { handler as GET, handler as POST }
