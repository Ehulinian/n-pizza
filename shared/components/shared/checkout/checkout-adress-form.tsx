'use client'

import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormTextarea } from '../form'
import { AddressInput } from '../address-input'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'

interface CheckoutAdressProps {
	className?: string
}

export const CheckoutAdressForm: React.FC<CheckoutAdressProps> = ({
	className,
}) => {
	const { control } = useFormContext()
	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>
				<FormTextarea
					name="comment"
					rows={5}
					className="text-base"
					placeholder="Коментарий к заказу"
				/>
			</div>
		</WhiteBlock>
	)
}
