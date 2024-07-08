import { ReadStream } from 'fs'
import OpenaiSDK from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'

enum OpenaiModel {
  DEFAULT = 'gpt-3.5-turbo-16k',
  IMAGE = 'dall-e-3',
  AUDIO_TO_TEXT = 'whisper-1',
  TEXT_TO_AUDIO = 'tts-1',
}

export class Openai {
  private api: OpenaiSDK

  constructor() {
    this.initialize()
  }

  private initialize(): void {
    try {
      const apiKey = process.env.SERVER_OPENAI_API_KEY

      if (!apiKey) {
        console.log(`Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI`)
        return
      }

      this.api = new OpenaiSDK({ apiKey })

      console.log(`Openai is active`)
    } catch (error) {
      console.error(`Openai failed to start`)
    }
  }

  isActive(): boolean {
    if (this.api) {
      return true
    } else {
      return false
    }
  }

  async generateText(prompt: string): Promise<string> {
    const messages = this.buildMessages(prompt)

    const response = await this.api.chat.completions.create({
      model: OpenaiModel.DEFAULT,
      messages,
    })

    const content = this.parseResponseContent(response)

    return content
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await this.api.images.generate({
      model: OpenaiModel.IMAGE,
      prompt: prompt,
    })

    const imageUrl = this.parseResponseImage(response)

    return imageUrl
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    const transcription = await this.api.audio.transcriptions.create({
      file: readStream,
      model: OpenaiModel.AUDIO_TO_TEXT,
    })

    return transcription.text
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    const mp3 = await this.api.audio.speech.create({
      model: OpenaiModel.TEXT_TO_AUDIO,
      voice: 'alloy',
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())

    return buffer
  }

  private buildMessages(content: string): ChatCompletionMessageParam[] {
    return [
      {
        role: 'user',
        content,
      },
    ]
  }

  private parseResponseContent(
    response: OpenaiSDK.Chat.Completions.ChatCompletion,
  ): string {
    return response.choices[0].message.content
  }

  private parseResponseImage(
    response: OpenaiSDK.Images.ImagesResponse,
  ): string {
    return response.data[0].url
  }
}
