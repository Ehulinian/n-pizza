'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
	formRegisterSchema,
	TFormRegisterValues,
} from './modals/auth-modal/forms/schemas'
import { User } from '@prisma/client'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { Container } from './container'
import { FormInput } from './form'
import { Button } from '../ui'
import { Title } from './title'
import { updateUserInfo } from '@/app/actions'

interface ProfileFormProps {
	data: User
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.error('User data updated 📝', {
				icon: '✅',
			})
		} catch (error) {
			return toast.error('Error updating data', {
				icon: '❌',
			})
		}
	}

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/',
		})
	}

	return (
		<Container>
			<Title
				text={`Personal information | #${data.id}`}
				size="md"
				className="font-bold"
			/>

			<FormProvider {...form}>
				<form
					className="flex flex-col gap-5 w-96 mt-10"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput name="email" label="E-Mail" required />
					<FormInput name="fullName" label="Полное имя" required />

					<FormInput
						type="password"
						name="password"
						label="New password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						label="Confirm password"
						required
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className="text-base mt-10"
						type="submit"
					>
						Save
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base"
						type="button"
					>
						Log out
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
