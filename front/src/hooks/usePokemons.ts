import { useState } from "react"
import { PokemonItem } from "../models/Pokemon"
import { searchPokemon, createPokemon } from "../api/api"


export const usePokemons = () => {

	const [pokemons, setPokemons] = useState<PokemonItem | null>(null)
	const [loading, setLoading] = useState(false)

	const guardarPokemon = async (param: PokemonItem) => {
		setLoading(true)
		try {
			await createPokemon(param)
			alert(`${param.name} guardado en tu pokedex! 🔥🔥`)

		} catch (err) {
			alert("Error al gaurdar pokemon")
		}

		setLoading(false)
	}

	const getPokemons = async (param: string) => {
		setLoading(true)

		try {
			const data = await searchPokemon(param)
			setPokemons(data)
		} catch (error) {
			// Manejor de errores
			alert("Error al buscar los pokemons")
			setPokemons(null)
		}

		setLoading(false)
	}


	return {
		search: getPokemons,
		loading,
		resultados: pokemons,
		guardar: guardarPokemon,
	}

}