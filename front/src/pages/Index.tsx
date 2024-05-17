import PokemonListItem from "../components/PokemonListItem"
import { usePokemons } from "../hooks/usePokemons"
import { PokemonItem } from "../models/Pokemon"
import { useNavigate } from "react-router-dom";




export default function Index() {

	const { search, loading, resultados, guardar } = usePokemons()
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const searchValue = formData.get("search") as string

		search(searchValue.toLowerCase())
	}

	const handleGuardar = (pokemon: PokemonItem) => {
		guardar(pokemon)
		navigate("/mi-pokedex")
	}

	return (
		<main className="container m-auto">
			<h2 className="text-2xl">Buscador</h2>

			<form className="flex gap-x-4 mt-2" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="search" className="mr-2">Buscar:</label>
					<input
						type="text"
						id="search"
						name="search"
						required
						placeholder="Insertar nombre o ID"
						className="border border-gray-400 p-2 rounded-xl w-80 text-black "
					/>

				</div>

				<input
					type="submit"
					value="Buscar"
					className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer"
				/>
			</form>

			<h3 className="text-xl mt-8 mb-2">Resultados</h3>

			<section>
				<ul className="flex flex-col gap-8">
					{
						loading ?
							<p>Cargando...</p> :
							resultados &&
							<PokemonListItem

								pokemon={resultados!}
								botones={
									<>
										<button
											className="bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors duration-300 ease-in-out cursor-pointer"
											onClick={() => handleGuardar(resultados!)}
										>
											Guardar
										</button>
									</>
								}
							/>
					}
				</ul>
			</section>
		</main>
	)

}