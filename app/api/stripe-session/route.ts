import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const sessionId = searchParams.get('session_id')

	if (!sessionId) {
		return Response.json({ error: 'No session_id' }, { status: 400 })
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId)

		return Response.json(session)
	} catch (err) {
		console.error(err)
		return Response.json({ error: 'Stripe error' }, { status: 500 })
	}
}
