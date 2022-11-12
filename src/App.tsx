import { useEffect, useState } from "react"
// import { LeftBar } from "./components/LeftBar"
import { Navbar } from "./components/Navbar"
import { ProductList } from "./components/ProductList"
import { SearchBar } from "./components/SearchBar"
import axios from "axios"
import { ProductsProps } from "./types"
import React from "react"
const LeftBar = React.lazy(() => import("./components/LeftBar"))

function App() {
	const [shouldView, setShouldView] = useState(false)
	const [products, setProducts] = useState<ProductsProps[] | []>([])
	const [filteredProducts, setFilteredProducts] = useState<
		ProductsProps[] | []
	>([])
	const [search, setSearch] = useState<string[] | []>([])
	const keys: string[] = ["name", "color", "type"]
	useEffect(() => {
		axios
			.get(
				"https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
			)
			.then((response) => {
				setProducts(response.data)
				setFilteredProducts(response.data)
			})
			.catch((e) => console.log("error: ", e))
	}, [])
	useEffect(() => {
		setFilteredProducts(
			products.filter((product) =>
				search.every((search) =>
					keys
						.map((key) =>
							product[key as "name" | "color" | "type"].toLowerCase()
						)
						.includes(search.toLowerCase())
				)
			)
		)
	}, [search])
	if (products.length === 0) {
		return <></>
	}
	return (
		<>
			<Navbar />
			<SearchBar search={search} setSearch={setSearch} />
			<button onClick={() => setShouldView(!shouldView)}>
				{!shouldView ? <>View</> : <>Hide</>}
			</button>
			<div className='mx-20 relative grid grid-cols-4'>
				<LeftBar
					products={products}
					setFilteredProducts={setFilteredProducts}
				/>
				<ProductList products={products} filteredProducts={filteredProducts} />
			</div>
		</>
	)
}

export default App
