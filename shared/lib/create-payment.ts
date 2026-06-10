'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createPayment(details: any) {
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',

		line_items: [
			{
				price_data: {
					currency: 'eur',

					product_data: {
						name: details.description,
					},

					unit_amount: details.amount * 100,
				},

				quantity: 1,
			},
		],

		metadata: {
			orderId: details.orderId,
		},

		success_url: `${process.env.NEXTAUTH_URL}/?paid`,
	})

	return session
}
