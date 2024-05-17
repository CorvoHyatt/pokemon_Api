export interface PokemonItem {
	id?: number
	name: string
	pokemon_id: number
	types?: string[]
	abilities?: string[]
	base_stats: BaseStats
	height: number
	weight: number
	sprite_url: string
}

interface BaseStats {
	hp: number
	attack: number
	defense: number
	"special-attack": number
	"special-defense": number
	speed: number
	[key: string]: number
}