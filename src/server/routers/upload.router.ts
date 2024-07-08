import { Trpc } from '@/core/trpc/server'
import { z } from 'zod'
import { UploadService } from '../libraries/upload'

export const UploadRouter = Trpc.createRouter({
  fromPrivateToPublicUrl: Trpc.procedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await UploadService.fromPrivateToPublicUrl({
        url: input.url,
      })

      const url = response[0].url

      return { url }
    }),
})
