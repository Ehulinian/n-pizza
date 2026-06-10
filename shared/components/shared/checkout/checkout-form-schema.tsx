import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'The name must contain at least 2 characters.' }),
	lastName: z
		.string()
		.min(2, { message: 'The last name must contain at least 2 characters.' }),
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	phone: z.string().min(9, { message: 'Please enter a valid phone number.' }),
	address: z.string().min(5, { message: 'Please enter a valid address' }),
	comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
