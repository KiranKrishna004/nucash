import { ProductsProps } from "../types"

export const ProductList = ({
	products,
	filteredProducts,
}: {
	products: ProductsProps[]
	filteredProducts: ProductsProps[]
}) => {
	return (
		<div className='grid grid-cols-3 gap-5 col-span-3'>
			{filteredProducts.map((product) => (
				<div
					key={product.id}
					className='flex flex-col item-center shadow-lg py-1 space-y-3'
				>
					<div className='relative p-1'>
						<img src={product.imageURL} />
						<p className='absolute top-0'>{product.name}</p>
					</div>
					<div className='flex h-full justify-around items-end'>
						<div>{product.price}</div>
						<button className='flex justify-items-end px-2 py-1 rounded-sm bg-gray-200'>
							Add to cart
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
