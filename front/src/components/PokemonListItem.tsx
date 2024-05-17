import { FC } from "react"
import { PokemonItem } from "../models/Pokemon"


interface PokemonListItemProps {
	botones: React.ReactNode
	pokemon: PokemonItem
}

const PokemonListItem: FC<PokemonListItemProps> = ({ botones, pokemon }) => {

	return (
		<li className="flex gap-x-8 rounded-xl border border-gray-400 p-2 items-center">
			<img className="w-32 h-32" src={pokemon.sprite_url} alt={pokemon.name}></img>

			<div className="flex gap-x-6">
				<div className="flex flex-col gap-y-2">
					<div>
						<h5 className="font-bold">Nombre:</h5>
						<h4>{pokemon.name}</h4>
					</div>

					<div>
						<h5 className="font-bold">ID:</h5>
						<p>{pokemon.pokemon_id}</p>
					</div>
				</div>

				<div className="flex flex-col gap-y-2">
					<div>
						<h5 className="font-bold">Tipos</h5>
						<p>{pokemon.types!.join(', ')}</p>
					</div>

					<div>
						<h5 className="font-bold">Abilidades</h5>
						<p>{pokemon.abilities!.join(', ')}</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2">
				{botones}
			</div>
		</li>
	)

}

export default PokemonListItem