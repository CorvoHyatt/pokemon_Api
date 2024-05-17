import { useEffect } from "react"
import { usePokedex } from "../hooks/usePokedex"
import PokemonListItem from "../components/PokemonListItem"
import { Link } from "react-router-dom"

export function Pokedex() {

	const {
		list,
		deletea,
		loading,
		resultados
	} = usePokedex()

	useEffect(() => {
		list()
	}, [])

	return (
		<main className="container m-auto p-10">

			<h3 className="text-xl mt-8 mb-2 ">Mi Pokedex</h3>

			<section>
				<ul className="flex flex-col gap-8">
					{
						loading ?
							<p>Cargando...</p> :
							resultados.map(pokemon => (

								<PokemonListItem
									key={pokemon.pokemon_id}
									pokemon={pokemon}
									botones={
										<>
											<Link
												to={`/mi-pokedex/${pokemon.id}`}
												className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors duration-300 ease-in-out cursor-pointer"
											>
												Detalles
											</Link>

											<Link
												to={`/mi-pokedex/puntaje/${pokemon.id}`}
												className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors duration-300 ease-in-out cursor-pointer"
											>
												Puntaje
											</Link>

											<button
												className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors duration-300 ease-in-out cursor-pointer"
												onClick={() => deletea(pokemon.id!)}
											>
												Eliminar
											</button>

											<Link
												to={`/mi-pokedex/editar/${pokemon.id}`}
												className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors duration-300 ease-in-out cursor-pointer"
											>
												Editar
											</Link>
										</>
									}
								/>
							))
					}

				</ul>
			</section>
		</main>
	)

}