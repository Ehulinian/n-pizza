'use client'

import { Container, Title } from '@/shared/components/shared'
import { CheckoutSideBar } from '@/shared/components/shared/checkout-side-bar'
import { useCart } from '@/shared/hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutCart } from '@/shared/components/shared/checkout/checkout-cart'
import { CheckoutPersonalForm } from '@/shared/components/shared/checkout'
import { CheckoutAdressForm } from '@/shared/components/shared/checkout/checkout-adress-form'
import {
	checkoutFormSchema,
	CheckoutFormValues,
} from '@/shared/components/shared/checkout/checkout-form-schema'
import { createOrder } from '@/app/actions'
import toast from 'react-hot-toast'
import React from 'react'

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false)
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
		useCart()

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus',
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true)

			const url = await createOrder(data)

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			})

			if (url) {
				location.href = url
			}
			
		} catch (err) {
			console.log(err)
			setSubmitting(false)
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			})
		}
	}

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								loading={loading}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
							/>

							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							<CheckoutAdressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>
						<div className="w-[450px]">
							<CheckoutSideBar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
