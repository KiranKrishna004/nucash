import { useEffect, useState } from "react"
import { ProductsProps } from "../types"

const LeftBar = ({
	products,
	setFilteredProducts,
}: {
	products: ProductsProps[] | []
	setFilteredProducts: React.Dispatch<
		React.SetStateAction<[] | ProductsProps[]>
	>
}) => {
	const [selected, setSelected] = useState<{
		colors: string[]
		types: string[]
		genders: string[]
		prices: string[]
	}>({
		colors: [],
		types: [],
		genders: [],
		prices: [],
	})
	const distinctColors = [...new Set(products.map((product) => product.color))]
	const distinctGenders = [
		...new Set(products.map((product) => product.gender)),
	]
	const distinctTypes = [...new Set(products.map((product) => product.type))]
	const priceValue = ["0-Rs250", "Rs251-450", "Rs 450"]

	useEffect(() => {
		if (
			Object.values(selected).filter((select) => select.length !== 0).length !==
			0
		) {
			let filtered = products.filter((product) => {
				if (!!selected.colors.length) {
					if (!!selected.genders.length) {
						if (!!selected.types.length) {
							return (
								selected.colors.includes(product.color) &&
								selected.genders.includes(product.gender) &&
								selected.types.includes(product.type)
							)
						} else {
							return (
								selected.colors.includes(product.color) &&
								selected.genders.includes(product.gender)
							)
						}
					} else if (!!selected.types.length) {
						return (
							selected.colors.includes(product.color) &&
							selected.types.includes(product.type)
						)
					} else {
						return selected.colors.includes(product.color)
					}
				} else if (!!selected.genders.length) {
					if (!!selected.types.length) {
						return (
							selected.genders.includes(product.gender) &&
							selected.types.includes(product.type)
						)
					} else {
						return selected.genders.includes(product.gender)
					}
				} else {
					return selected.types.includes(product.type)
				}
			})
			if (!!selected.prices.length) {
				if (selected.prices.includes("0-Rs250")) {
					filtered = filtered.filter((product) => product.price <= 250)
				}
				if (selected.prices.includes("Rs251-450")) {
					filtered = filtered.filter((product) => product.price <= 450)
				}
				if (selected.prices.includes("Rs 450")) {
					filtered = filtered.filter((product) => product.price > 450)
				}
			}

			setFilteredProducts(filtered)
		} else {
			setFilteredProducts(products)
		}
	}, [selected])
	console.log(products)
	if (products.length !== 0) {
		return (
			<div className='col-span-1 sticky top-10 '>
				<div className='px-7 py-4 shadow-[0_0px_10px_rgba(0,0,0,0.10)] w-5/6'>
					<div className='text-xl font-bold mb-1'>Colour</div>
					{distinctColors.map((color: string, index) => (
						<div
							key={index}
							className='ml-1 text-sm font-semibold flex space-x-3 space-y-0.5'
						>
							<input
								type='checkbox'
								value={color}
								checked={
									selected.colors.length > 0
										? selected.colors.includes(color)
										: false
								}
								onChange={(e) => {
									if (!selected.colors.includes(e.target.value)) {
										setSelected({
											...selected,
											colors: [...selected.colors, e.target.value],
										})
									} else {
										setSelected({
											...selected,
											colors: selected.colors.filter(
												(selectedColor) => selectedColor !== e.target.value
											),
										})
									}
								}}
							/>
							<p>{color}</p>
						</div>
					))}
					<div className='text-xl font-bold mt-2 mb-1'>Gender</div>
					{distinctGenders.map((gender: string, index) => (
						<div
							key={index}
							className='ml-1 text-sm font-semibold flex space-x-3 space-y-0.5'
						>
							<input
								type='checkbox'
								value={gender}
								checked={
									selected.genders.length > 0
										? selected.genders.includes(gender)
										: false
								}
								onChange={(e) => {
									if (!selected.genders.includes(e.target.value)) {
										setSelected({
											...selected,
											genders: [...selected.genders, e.target.value],
										})
									} else {
										setSelected({
											...selected,
											genders: selected.genders.filter(
												(selectedGender) => selectedGender !== e.target.value
											),
										})
									}
								}}
							/>
							<p>{gender}</p>
						</div>
					))}
					<div className='text-xl font-bold mt-2 mb-1'>Price</div>
					{priceValue.map((price, index) => (
						<div
							key={index}
							className='ml-1 text-sm font-semibold flex space-x-3 space-y-0.5'
						>
							<input
								type='checkbox'
								value={price}
								checked={
									selected.prices.length > 0
										? selected.prices.includes(price)
										: false
								}
								onChange={(e) => {
									if (!selected.prices.includes(e.target.value)) {
										setSelected({
											...selected,
											prices: [...selected.prices, e.target.value],
										})
									} else {
										setSelected({
											...selected,
											prices: selected.prices.filter(
												(selectedType) => selectedType !== e.target.value
											),
										})
									}
								}}
							/>
							<p>{price}</p>
						</div>
					))}
					<div className='text-xl font-bold mt-2 mb-1'>Type</div>
					{distinctTypes.map((type, index) => (
						<div
							key={index}
							className='ml-1 text-sm font-semibold flex space-x-3'
						>
							<input
								type='checkbox'
								value={type}
								checked={
									selected.types.length > 0
										? selected.types.includes(type)
										: false
								}
								onChange={(e) => {
									if (
										selected.types.length === 0 ||
										!selected.types.includes(e.target.value)
									) {
										setSelected({
											...selected,
											types: [...selected.types, e.target.value],
										})
									} else {
										setSelected({
											...selected,
											types: selected.types.filter(
												(selectedType) => selectedType !== e.target.value
											),
										})
									}
								}}
							/>
							<p>{type}</p>
						</div>
					))}
				</div>
			</div>
		)
	}
	return <></>
}

export default LeftBar
