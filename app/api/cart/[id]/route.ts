import { prisma } from '@/prisma/prisma-client'
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const body = await req.json()
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Токен не найден' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Товар не найден' })
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: body.quantity,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] Server Error', error)
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 },
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id)
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Токен не найден' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Товар не найден' })
		}

		await prisma.cartItem.delete({
			where: {
				id,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_DELETE] Server Error', error)
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 },
		)
	}
}
