import { useEffect, useState } from "react"
import { ProductsProps } from "../types"

export const SearchBar = ({
	search,
	setSearch,
}: {
	search: string[]
	setSearch: React.Dispatch<React.SetStateAction<[] | string[]>>
}) => {
	const [textSearch, setTextSearch] = useState("")
	const handleSearch = () => {
		setSearch(textSearch.split(" ").filter((word) => word !== ""))
	}

	return (
		<div className='my-10 flex justify-center w-full space-x-2 '>
			<input
				className='w-1/4 p-0.5 border-b border-gray-500 pb-2 focus:outline-none'
				value={textSearch}
				placeholder='Search for products...'
				onChange={(e) => setTextSearch(e.target.value)}
			/>
			<button
				className='bg-gray-200 px-2 py-1 rounded-md'
				onClick={handleSearch}
			>
				Search
			</button>
		</div>
	)
}
