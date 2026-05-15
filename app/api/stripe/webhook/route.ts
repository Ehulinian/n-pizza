import Stripe from 'stripe'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { headers } from 'next/headers'
import { sendEmail } from '@/shared/lib'
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates/order-success'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_DEV_SECRET!

export async function POST(req: Request) {
	const body = await req.text()
	const sig = headers().get('stripe-signature')!

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
	} catch (err) {
		console.log('Webhook signature error', err)
		return new Response('Webhook Error', { status: 400 })
	}

	if (event.type === 'checkout.session.expired') {
		const session = event.data.object as Stripe.Checkout.Session

		console.log('SESSION:', session)
		const orderId = session.metadata?.orderId
		if (!orderId) return new Response('No orderId', { status: 400 })

		await prisma.order.update({
			where: { id: Number(orderId) },
			data: {
				status: OrderStatus.CANCELLED,
			},
		})
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session
		console.log('SESSION:', session)

		const orderId = session.metadata?.orderId

		if (!orderId) {
			return new Response('No orderId', { status: 400 })
		}

		const order = await prisma.order.update({
			where: { id: Number(orderId) },
			data: {
				status: OrderStatus.SUCCEEDED,
				paymentId: session.id,
			},
		})

		await sendEmail(
			order.email,
			'Next Pizza / Ваш заказ успешно оформлен 🎉',
			OrderSuccessTemplate({
				orderId: order.id,
				items: JSON.parse(order.items as string),
			}),
		)
	}

	return new Response('OK', { status: 200 })
}
