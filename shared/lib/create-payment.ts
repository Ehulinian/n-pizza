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

		// success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cancel`,
	})

	return session
}
