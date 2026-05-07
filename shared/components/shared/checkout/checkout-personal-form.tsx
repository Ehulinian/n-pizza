import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'

interface CheckoutPersonalFormProps {
	className?: string
}

export const CheckoutPersonalForm: React.FC<CheckoutPersonalFormProps> = ({
	className,
}) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className="grid grid-cols-2 gap-5">
				<FormInput
					name="firstName"
					className="text-base"
					placeholder="Имя"
				></FormInput>
				<FormInput
					name="lastName"
					className="text-base"
					placeholder="Фамилия"
				></FormInput>
				<FormInput
					name="email"
					className="text-base"
					placeholder="E-Mail"
				></FormInput>
				<FormInput name="phone" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	)
}
