import { useState } from "react"
import { borrarPokemon, getPokemonDB, getScore, listPokedex, updatePokemonDB } from "../api/api"
import { PokemonItem } from "../models/Pokemon"
import { useNavigate } from "react-router-dom";

export const usePokedex = () => {
	const navigate = useNavigate();
	const [score, setScore] = useState<number | null>(null)
	const [pokemons, setPokemons] = useState<PokemonItem[]>([])
	const [pokemon, setPokemon] = useState<PokemonItem | null>(null)
	const [loading, setLoading] = useState(false)

	const getDetails = async (id: number) => {
		setLoading(true)
		try {
			const pokemon = await getPokemonDB(id)
			setPokemon(pokemon)
		} catch (error) {
			alert("Error al buscar los pokemons")
			setPokemon(null)
		}

		setLoading(false)
	}

	const getPokemons = async () => {
		setLoading(true)

		try {
			const data = await listPokedex()
			setPokemons(data)
		} catch (error) {

			alert("Error al buscar los pokemons")
			setPokemons([])
		}

		setLoading(false)
	}

	const deletePokemon = async (id: number) => {
		setLoading(true)
		try {
			await borrarPokemon(id)
			const data = await listPokedex()
			setPokemons(data)
		} catch (error) {

			alert("Error al borrar pokemon")
		}

		setLoading(false)
	}

	const editPokemon = async (id: number, pokemon: PokemonItem) => {
		setLoading(true)
		try {
			await updatePokemonDB(id, pokemon)
			alert("Pokemon Editado con exito")
			navigate('/mi-pokedex')
		} catch (error) {
			alert("Error al Editar el pokemon")
		}
	}

	const getPuntaje = async (id: number) => {
		setLoading(true)
		try {
			const data = await getScore(id)
			setScore(data)
		} catch (error) {
			alert("Error al buscar el score")
		}
	}


	return {
		list: getPokemons,
		deletea: deletePokemon,
		edit: editPokemon,
		loading,
		getDetails,
		getPuntaje,
		score,
		resultados: pokemons,
		resultado: pokemon
	}

}