import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
import { Container } from './container'
import { Category } from '@prisma/client'

interface TopBarProps {
	categories: Category[]
	className?: string
}

export const TopBar: React.FC<TopBarProps> = ({ className, categories }) => {
	return (
		<div
			className={cn(
				'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
				className,
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories items={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}
