import { User } from '@prisma/client'
import { Provider } from './internal/providers/provider'
import { StripeProvider } from './internal/providers/stripe/stripe.provider'
import {
  Payment,
  Product,
  StripeWebhookResponse,
  Subscription,
} from './payment.type'

class Service {
  private provider: Provider = new StripeProvider()

  isActive(): boolean {
    if (this.provider) {
      return this.provider?.isActive()
    }

    return false
  }

  getCustomerId(user: User): string {
    return user.stripeCustomerId
  }

  async findManyProducts(): Promise<Product[]> {
    return this.provider.findManyProducts()
  }

  async findManySubscriptions(user: User): Promise<Subscription[]> {
    return this.provider.findManySubscriptions(this.getCustomerId(user))
  }

  async findManyPayments(user: User): Promise<Payment[]> {
    return this.provider.findManyPayments(this.getCustomerId(user))
  }

  async createPaymentLink(options: {
    user: User
    productId: string
    metadata?: Record<string, string>
    urlRedirection?: string
  }): Promise<string> {
    const optionsPayment = {
      ...options,
      customerId: this.getCustomerId(options.user),
    }

    return this.provider.createPaymentLink(optionsPayment)
  }

  async onPayment(body: Buffer, sig: string): Promise<StripeWebhookResponse> {
    return this.provider.onPayment(body, sig)
  }

  async createCustomer(user: User): Promise<string> {
    return this.provider.createCustomer({
      name: user.name ?? user.email,
      email: user.email,
    })
  }
}

class Singleton {
  static service = new Service()
}

export const PaymentService = Singleton.service
