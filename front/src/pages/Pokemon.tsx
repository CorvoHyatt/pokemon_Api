import { useParams } from "react-router-dom";
import { usePokedex } from "../hooks/usePokedex";
import { useEffect } from "react";

export const Pokemon = () => {
	const { id } = useParams();
	const { resultado: pokemon, getDetails } = usePokedex();

	useEffect(() => {
		getDetails(Number(id));
	}, [id]);

	return (
		<main className="container m-auto">
			{pokemon ? (
				<>
					<section className="flex flex-col items-center text-center gap-y-4 m-auto">
						<h2 className="text-2xl text-center font-bold">Detalles de {pokemon?.name}</h2>

						<img src={pokemon.sprite_url} alt={pokemon.name} className="w-64 h-64" />

						<div>
							<p className="text-lg font-bold">Nombre</p>
							<p>{pokemon.name}</p>
						</div>

						<div>
							<p className="text-lg font-bold">Altura</p>
							<p>{pokemon.height}</p>
						</div>

						<div className="text-lg font-bold">
							<p>Peso</p>
							<p>{pokemon.weight}</p>
						</div>

						<div>
							<p className="text-lg font-bold">Tipos</p>
							<p>{pokemon.types!.join(", ")}</p>
						</div>

						<div>
							<p className="text-lg font-bold">Habilidades</p>
							<p>{pokemon.abilities!.join(", ")}</p>
						</div>
					</section>

					<section className="mt-8 w-72 m-auto pb-10">
						<h2 className="text-xl font-bold text-center">Estadísticas</h2>

						{Object.keys(pokemon.base_stats).map(stat => (
							<div key={stat} className="flex justify-between">
								<p>{stat}</p>
								<p>{pokemon.base_stats[stat]}</p>
							</div>
						))}
					</section>
				</>
			) : (
				<p className="text-center">Cargando...</p>
			)}
		</main>
	);
};
