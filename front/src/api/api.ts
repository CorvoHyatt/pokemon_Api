import { PokemonItem } from "../models/Pokemon"

const URL = "http://127.0.0.1:8000/pokemon"
/* GENERAL */
export const searchPokemon = async (param: string): Promise<PokemonItem> => {
	try {
		const response = await fetch(`${URL}/${param}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Error al buscar el Pokémon: ${response.statusText}`);
		}

		const data: PokemonItem = await response.json();

		return data;
	} catch (error) {
		console.error('Error al buscar el Pokémon:', error);
		throw error;
	}
};

/* POKEDEX */
export const listPokedex = async (): Promise<PokemonItem[]> => {
	try {
		const response = await fetch(`${URL}/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(`Error al listar los Pokémons: ${errorMessage}`)
		}

		const data: PokemonItem[] = await response.json()
		return data
	} catch (error) {
		console.error('Error en listPokedex:', error)
		throw new Error('No se pudo obtener la lista de Pokémons')
	}
}

export const borrarPokemon = async (id: number): Promise<void> => {
	try {
		const response = await fetch(`${URL}/delete/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(`Error al eliminar el Pokémon: ${errorMessage}`)
		}

		alert('Pokémon eliminado con éxito')
	} catch (error) {
		console.error('Error en deletePokemon:', error)
		alert(`Error al eliminar el Pokémon`)
		throw error
	}
}

export const createPokemon = async (pokemon: PokemonItem): Promise<void> => {
	try {
		const response = await fetch(`${URL}/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(pokemon),
		})

		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(`Error al crear el Pokémon: ${errorMessage}`)
		}

	} catch (error) {
		console.error('Error en createPokemon:', error)
		throw error
	}
}

export const getPokemonDB = async (id: number): Promise<PokemonItem> => {
	try {
		const response = await fetch(`${URL}/details/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(`Error al obtener el pokemon: ${errorMessage}`)
		}
		const data: PokemonItem = await response.json()
		return data
	} catch (error) {

		throw error
	}
}

export const updatePokemonDB = async (id: number, pokemon: PokemonItem): Promise<void> => {
	try {
		const response = await fetch(`${URL}/update/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(pokemon),
		})

		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(`Error al Actualizar el Pokémon: ${errorMessage}`)
		}

	} catch (error) {
		console.error('Error en Actualizar el pokemon:', error)
		throw error
	}
}

export const getScore = async (id: number): Promise<number> => {
	try {
		const response = await fetch(`${URL}/score/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(`Error al obtener el score: ${errorMessage}`)
		}
		const data = await response.json()
		return data["score"]
	} catch (error) {
		console.error('Error al obtener el Score', error)
		throw error
	}

}