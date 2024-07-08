import { UploadProviderAws } from './internal/providers/aws/upload.provider.aws'
import { UploadProviderLocal } from './internal/providers/local/upload.provider.local'
import { UploadProvider } from './upload.provider'
import { UploadFileType } from './upload.type'

export class Service {
  private instance: UploadProvider

  constructor() {
    this.createInstance().then(instance => (this.instance = instance))
  }

  private async createInstance(): Promise<UploadProvider> {
    try {
      console.log(`Trying using AWS...`)

      const instance = new UploadProviderAws()

      await instance.initialise()

      return instance
    } catch (error) {
      console.warn(`Could not use AWS: ${error.message}`)
    }

    console.log(
      `Falling back on local provider (not recommended for production)`,
    )

    try {
      const instance = new UploadProviderLocal()

      await instance.initialise()

      return instance
    } catch (error) {
      console.warn(`Could not use local provider: ${error.message}`)
    }
  }

  async uploadPublic(...files: UploadFileType[]): Promise<{ url: string }[]> {
    const responses = []

    for (const file of files) {
      const response = await this.instance.uploadPublic({ file })

      responses.push(response)
    }

    return responses
  }

  async uploadPrivate(...files: UploadFileType[]): Promise<{ url: string }[]> {
    const responses = []

    for (const file of files) {
      const response = await this.instance.uploadPrivate({ file })

      responses.push(response)
    }

    return responses
  }

  async fromPrivateToPublicUrl(
    ...items: { url: string; expiresInSeconds?: number }[]
  ): Promise<{ url: string }[]> {
    const responses = []

    for (const item of items) {
      const response = await this.instance.fromPrivateToPublicUrl(item)

      responses.push(response)
    }

    return responses
  }
}

class Singleton {
  static service = new Service()
}

export const UploadService = Singleton.service
