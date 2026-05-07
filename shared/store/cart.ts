import { create } from 'zustand'
import { Api } from '../services/api-client'
import { getCartDetails } from '../lib'
import { CreateCartItemValues } from '../services/dto/cart.dto'
import { CartStateItem } from '../lib/get-cart-details'

export type ICartItem = {
	id: number
	quantity: number
	name: string
	price: number
	imageUrl: string
	pizzaSize: number | null
	pizzaType?: number | null
	ingredients: Array<{ name: string; price: number }>
	disabled?: boolean
}

export interface CartState {
	loading: boolean
	error: boolean
	items: CartStateItem[]
	totalAmount: number
	fetchCartItems: () => Promise<void>
	updateItemQuantity: (id: number, quantity: number) => Promise<void>
	addCartItem: (values: any) => Promise<void>
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map(item =>
					item.id === id
						? {
								...item,
								disabled: true,
							}
						: item,
				),
			}))
			const data = await Api.cart.removeCartItem(id)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set(state => ({
				loading: false,
				items: state.items.map(item => ({
					...item,
					disabled: false,
				})),
			}))
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateItemQuantity(id, quantity)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(values)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
