import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(6, { message: 'Введите коректный пароль' })

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Введите коректный email' }),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Введите коректное имя' }),
			confirmPassword: passwordSchema,
		}),
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
