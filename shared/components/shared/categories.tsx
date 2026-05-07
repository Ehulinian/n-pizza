'use client'

import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import { Category } from '@prisma/client'

interface CategoriesProps {
	items: Category[]
	className?: string
}

export const Categories: React.FC<CategoriesProps> = ({ className, items }) => {
	const categoryActiveId = useCategoryStore(state => state.activeId)
	return (
		<div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50', className)}>
			{items.map(({ name, id }, index) => (
				<a
					key={index}
					href={`#${name}`}
					className={cn(
						'flex h-11 items-center rounded-2xl px-5 font-bold',
						categoryActiveId === id &&
							'bg-white text-primary shadow-md shadow-gray-200',
					)}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	)
}
