import { useParams } from "react-router-dom";
import { usePokedex } from "../hooks/usePokedex";
import { useEffect } from "react";

export const Pokemon_puntaje = () => {
	const { id } = useParams();
	const { resultado: pokemon, getDetails, score, getPuntaje } = usePokedex();

	useEffect(() => {
		getDetails(Number(id));
		getPuntaje(Number(id))
	}, [id]);

	return (
		<main className="container m-auto">
			{pokemon ? (
				<>
					<section className="flex flex-col items-center text-center gap-y-4 m-auto">
						<h2 className="text-2xl text-center font-bold">Score de {pokemon?.name}</h2>

						<img src={pokemon.sprite_url} alt={pokemon.name} className="w-64 h-64" />

						<div>
							<p className="text-lg font-bold">Nombre</p>
							<p>{pokemon.name}</p>
						</div>

						<div>
							<p className="text-lg font-bold">Score</p>
							<p>{score}</p>
						</div>

					</section>
				</>
			) : (
				<p className="text-center">Cargando...</p>
			)}
		</main>
	);
};
