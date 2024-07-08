import { DateHelper } from '@/core/helpers/date'
import { FileHelper } from '@/core/helpers/file'
import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import axios from 'axios'
import { z } from 'zod'
import { OpenaiService } from '../libraries/openai'
import { UploadFileType, UploadService } from '../libraries/upload'

/**
 * @provider AiApi
 * @description An AI library to query OpenAI
 * @function {({ prompt: string }) => Promise<{ answer: string}>} generateText - Send the prompt to OpenAI and get back its answer
 * @function {({ prompt: string }) => Promise<{ url: string }>} generateImage - Send the prompt to OpenAI to generate an Image and get back the URL of the image in the answer
 * @function {({ url: string }) => Promise<{ translation: string }>} audioToText - Send the readStream of an audio file to OpenAI to transcribe it into text and get back the text in the answer
 * @function {({ text: string } => Promise<{ url: string }>} textToAudio - Send the text to OpenAI to convert it into an mp3 file and get back the url of the audio file
 * @usage `const generateText = Api.ai.chat.useMutation(); generateText.mutateAsync({ prompt: 'How are you?' }).then(response => response.answer);`
 * @isImportOverriden false
 * @import import { Api } from '@/core/trpc'
 */

const check = () => {
  if (!OpenaiService.isActive()) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Set OPENAI_API_KEY in your .env to activate OpenAI',
    })
  }
}

export const AiRouter = Trpc.createRouter({
  generateText: Trpc.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const answer = await OpenaiService.generateText(input.prompt)

      return { answer }
    }),

  generateImage: Trpc.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const url = await OpenaiService.generateImage(input.prompt)

      return { url }
    }),

  audioToText: Trpc.procedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const arrayBuffer = await axios
        .get<ArrayBuffer>(input.url, { responseType: 'arraybuffer' })
        .then(response => response.data)

      const readstream = await FileHelper.createReadStreamFromArrayBuffer(
        arrayBuffer,
        'audio.wav',
      )

      const translation = await OpenaiService.fromAudioToText(readstream)

      return { translation }
    }),

  textToAudio: Trpc.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const buffer = await OpenaiService.fromTextToAudio(input.text)

      const now = DateHelper.getNow()

      const name = `${now.getTime()}__text-to-audio.mp3`

      const file: UploadFileType = {
        name,
        mimetype: 'audio/mp3',
        buffer,
      }

      const urls = await UploadService.uploadPublic(file)

      const url = urls[0].url

      return { url }
    }),
})
