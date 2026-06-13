'use client'

import { useFilters, useQueryFilters } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

interface SortPopupProps {
	className?: string
}

const sortVariants = [
	{
		name: 'Price',
		value: 'price',
	},
	{
		name: 'Name',
		value: 'name',
	},
] as const

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
	const [open, setOpen] = React.useState(false)

	const filters = useFilters()

	useQueryFilters(filters)

	const currentSort =
		sortVariants.find(item => item.value === filters.sortBy)?.name ??
		'Popularity'

	return (
		<div className={cn('relative', className)}>
			<div
				onClick={() => setOpen(prev => !prev)}
				className="inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5"
			>
				<ArrowUpDown size={16} />

				<b>Sort:</b>

				<b className="text-primary">{currentSort}</b>
			</div>

			{open && (
				<div className="absolute top-14 left-0 z-20 min-w-[220px] rounded-xl bg-white p-2 shadow-lg">
					{sortVariants.map(item => (
						<div
							key={item.value}
							onClick={() => {
								filters.setSortBy(item.value)
								setOpen(false)
							}}
							className={cn(
								'cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-100',
								filters.sortBy === item.value &&
									'bg-primary/10 text-primary font-medium',
							)}
						>
							{item.name}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
