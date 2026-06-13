import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
	query?: string
	sortBy?: string
	sizes?: string
	pizzaTypes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(',').map(Number)
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
	const ingredientsIdArr = params.ingredients?.split(',').map(Number)
	const sortBy = params.sortBy

	let orderBy: any = { id: 'desc' }

	if (sortBy === 'name') {
		orderBy = { name: 'asc' }
	}

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: orderBy,
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
							}
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	})

	return categories
}
