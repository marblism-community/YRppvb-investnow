import { Database } from '@/core/database'
import { Utility } from '@/core/helpers/utility'
import { PaymentService } from '@/server/libraries/payment'
import { User } from '@prisma/client'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log('Stripe webhook received')

    if (!PaymentService.isActive()) {
      return new NextResponse(`Stripe not activated`, {
        status: 400,
      })
    }

    const sig = headers().get('Stripe-Signature') as string

    const text = await req.text()

    const buffer = Buffer.from(text)

    const data = await PaymentService.onPayment(buffer, sig)

    if (Utility.isNull(data)) {
      return new NextResponse(`Could not parse request body`, {
        status: 200,
      })
    }

    const { userId, stripeCustomerId } = data

    let user: User

    if (userId && stripeCustomerId) {
      user = await Database.getUnprotected().user.findFirstOrThrow({
        where: { id: userId, stripeCustomerId },
      })
    } else if (userId) {
      user = await Database.getUnprotected().user.findFirstOrThrow({
        where: { id: userId },
      })
    } else if (stripeCustomerId) {
      user = await Database.getUnprotected().user.findFirstOrThrow({
        where: { stripeCustomerId },
      })
    }

    if (!user) {
      return new NextResponse(
        `Could find any user with userId (${userId}) and customerId (${stripeCustomerId})`,
        {
          status: 404,
        },
      )
    }

    if (!user.stripeCustomerId) {
      user = await Database.getUnprotected().user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomerId },
      })

      console.log(
        `Stripe customer id "${stripeCustomerId}" saved on user "${user.id}"`,
      )
    }

    // Add your custom logic here

    return new NextResponse(`Webhook successful`, {
      status: 200,
    })
  } catch (error: any) {
    console.error('Could not handle Stripe webhook')
    console.error(error)
    return new NextResponse(`Unknown error: ${error.message}`, {
      status: 500,
    })
  }
}
