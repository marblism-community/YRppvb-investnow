import { ReadStream } from 'fs'
import { Openai } from './internal/openai'

class Service {
  private openai = new Openai()

  async generateText(prompt: string): Promise<string> {
    return this.openai.generateText(prompt)
  }

  async generateImage(prompt: string): Promise<string> {
    return this.openai.generateImage(prompt)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    return this.openai.fromAudioToText(readStream)
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    return this.openai.fromTextToAudio(text)
  }

  isActive(): boolean {
    return this.openai.isActive()
  }
}

class Singleton {
  static service = new Service()
}

export const OpenaiService = Singleton.service
