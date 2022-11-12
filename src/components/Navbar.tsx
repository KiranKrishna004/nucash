export const Navbar = () => {
	return (
		<div className='flex justify-between bg-gray-100 py-5 px-10'>
			<p className='text-lg font-semibold'>TeeRex Store</p>
			<div className='flex space-x-2'>
				<p className='font-semibold border-b pb-0.5 border-gray-500'>
					Products
				</p>
				<p>Icon</p>
			</div>
		</div>
	)
}
