import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(6, { message: 'Please enter the correct password.' })

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Please enter a valid name.' }),
			confirmPassword: passwordSchema,
		}),
	)
	.refine(data => data.password === data.confirmPassword, {
		message: `The passwords don't match`,
		path: ['confirmPassword'],
	})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
