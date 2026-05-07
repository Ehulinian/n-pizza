'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui'

type Place = {
	place_id: string
	display_name: string
}

interface Props {
	onChange?: (value: string) => void
}

export const AddressInput = ({ onChange }: Props) => {
	const [value, setValue] = useState('')
	const [results, setResults] = useState<Place[]>([])

	useEffect(() => {
		if (!value) {
			setResults([])
			return
		}

		const timeout = setTimeout(async () => {
			const res = await fetch(
				`/api/address-search?q=${encodeURIComponent(value)}`,
			)

			const data: Place[] = await res.json()
			setResults(data)
		}, 300) // ⬅️ debounce 300ms

		return () => clearTimeout(timeout)
	}, [value])

	const handleChange = (text: string) => {
		setValue(text)
		onChange?.(text)
	}

	const select = (place: Place) => {
		setValue(place.display_name)
		onChange?.(place.display_name)
		setResults([])
	}

	return (
		<div className="relative">
			<Input
				value={value}
				onChange={e => handleChange(e.target.value)}
				placeholder="Enter address..."
			/>

			{results.length > 0 && (
				<ul className="absolute top-full left-0 right-0 bg-white border z-10 max-h-48 overflow-auto">
					{results.map(place => (
						<li
							key={place.place_id}
							onClick={() => select(place)}
							className="p-2 cursor-pointer hover:bg-gray-100"
						>
							{place.display_name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
