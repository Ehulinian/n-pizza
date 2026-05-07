import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Имя должно содержать минимум 2-х символов' }),
	lastName: z
		.string()
		.min(2, { message: 'Фамилия должна содержать минимум 2-х символов' }),
	email: z.string().email({ message: 'Введите коректный email' }),
	phone: z.string().min(9, { message: 'Введите коректный номер' }),
	address: z.string().min(5, { message: 'Введите коректный адрес' }),
	comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>