import { Ingredient, ProductItem } from '@prisma/client'
import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza'
import { calcTotalPizzaPrice } from './calc-total-price'

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
) => {
	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	)
	const textDetaills = `${size} cm, ${mapPizzaType[type]} пицца`

	return { totalPrice, textDetaills }
}
