import * as NodemailerSDK from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { EmailSender } from '../../email.type'
import { EmailTemplateService } from '../../templates/email.template.service'
import { Provider, SendOptions } from '../provider'
import { Logger } from 'sass'

export class NodemailerProvider implements Provider {
  private logger: Logger
  private client: Mail
  private templateService = new EmailTemplateService()

  constructor() {
    this.initialise()
  }

  private initialise() {
    try {
      const host = process.env.SERVER_EMAIL_MAILPIT_HOST ?? 'localhost'

      const port = process.env.SERVER_EMAIL_MAILPIT_PORT ?? 1022

      this.client = NodemailerSDK.createTransport({
        host,
        port,
      })

      console.log(`Nodemailer is active (${host}:${port})`)
    } catch (error) {
      console.error(`Nodemailer failed to start: ${error.message}`)
    }
  }

  async send(options: SendOptions): Promise<void> {
    const from = EmailSender.default

    const content = this.templateService.get(options)

    for (const to of options.to) {
      await this.client
        .sendMail({
          from: `${from.name} <${from.email}>`,
          to: to.email,
          subject: options.subject,
          html: content,
        })
        .then(result => {
          console.log(`Emails sent`)
        })
        .catch(error => {
          console.error(`Could not send emails (${error.statusCode})`)
          console.error(error)
        })
    }
  }
}
