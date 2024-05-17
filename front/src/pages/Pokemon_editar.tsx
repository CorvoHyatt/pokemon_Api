import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { usePokedex } from "../hooks/usePokedex"
import { PokemonItem } from "../models/Pokemon"


export const Pokemon_editar = () => {

	const { id } = useParams()
	const { resultado: pokemon, getDetails, edit } = usePokedex()

	useEffect(() => {
		getDetails(Number(id))
	}, [id])


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget);
		const updatedPokemon: PokemonItem = {
			name: String(formData.get('name')),
			pokemon_id: Number(formData.get('pokemon_id')),

			base_stats: {
				hp: Number(formData.get('hp')),
				attack: Number(formData.get('attack')),
				defense: Number(formData.get('defense')),
				"special-attack": Number(formData.get('special-attack')),
				"special-defense": Number(formData.get('special-defense')),
				speed: Number(formData.get('speed'))
			},
			height: Number(formData.get('height')),
			weight: Number(formData.get('weight')),
			sprite_url: String(formData.get('sprite_url'))
		};

		edit(Number(id), updatedPokemon);

	};
	return (
		<form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white text-black">
			<h2 className="text-2xl font-bold mb-4">Editar Pokémon</h2>

			<div className="mb-4">
				<label className="block text-gray-700">Nombre</label>
				<input
					type="text"
					name="name"
					defaultValue={pokemon?.name}
					className="mt-1 p-2 w-full border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">ID de Pokémon</label>
				<input
					type="number"
					name="pokemon_id"
					defaultValue={pokemon?.pokemon_id}
					className="mt-1 p-2 w-full border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Altura</label>
				<input
					type="number"
					name="height"
					defaultValue={pokemon?.height}
					className="mt-1 p-2 w-full border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Peso</label>
				<input
					type="number"
					name="weight"
					defaultValue={pokemon?.weight}
					className="mt-1 p-2 w-full border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">URL del Sprite</label>
				<input
					type="text"
					name="sprite_url"
					defaultValue={pokemon?.sprite_url}
					className="mt-1 p-2 w-full border rounded"
				/>
			</div>

			<div className="mb-4">
				<h3 className="text-xl font-bold mb-2">Estadísticas Base</h3>
				{Object.keys(pokemon?.base_stats || []).map(stat => (
					<div key={stat} className="mb-2">
						<label className="block text-gray-700 capitalize">{stat.replace('-', ' ')}</label>
						<input
							type="number"
							name={stat}
							defaultValue={pokemon?.base_stats[stat]}
							className="mt-1 p-2 w-full border rounded"
						/>
					</div>
				))}
			</div>

			<button
				type="submit"
				className="mt-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Guardar Cambios
			</button>
		</form>
	)
}

