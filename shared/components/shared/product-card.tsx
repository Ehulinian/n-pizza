import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { Ingredient } from '@prisma/client'

interface ProductCardProps {
	id: number
	name: string
	price: number
	ingredients: Ingredient[]
	imageUrl: string
	className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
	className,
	id,
	name,
	ingredients,
	price,
	imageUrl,
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`} scroll={false}>
				<div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
					<img className="h-[215px] w-[215px]" src={imageUrl} alt={name} />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

				<p className="text-sm text-gray-400">
					{ingredients.map(item => item.name).join(', ')}
				</p>

				<div className="mt-4 flex items-center justify-between">
					<span className="text-[20px]">
						от <b>{price}</b>
					</span>

					<Button variant="secondary">
						<Plus size={20} className="mr-1" />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	)
}
