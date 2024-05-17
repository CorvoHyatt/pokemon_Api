import { Link, Outlet } from "react-router-dom"

export const Navegacion = () => {

	return (
		<>
			<header className="border-b border-gray-400 mb-4 flex justify-center gap-x-4 p-4">
				<Link
					to="/"
					className="bg-green-800 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors duration-300 ease-in-out cursor-pointer"
				>
					Pokémon
				</Link>

				<Link
					to="/mi-pokedex"
					className="bg-red-800 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors duration-300 ease-in-out cursor-pointer"
				>
					Mi Pokedex
				</Link>
			</header>

			<Outlet />
		</>
	)

}