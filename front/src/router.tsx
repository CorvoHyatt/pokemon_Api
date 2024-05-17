import { createBrowserRouter } from "react-router-dom"
import Index from "./pages/Index"
import { Pokedex } from "./pages/Pokedex"
import { Navegacion } from "./components/Navegacion"
import { Pokemon } from "./pages/Pokemon"
import { Pokemon_editar } from "./pages/Pokemon_editar"
import { Pokemon_puntaje } from "./pages/Pokemon_puntaje"


export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navegacion />,
		children: [
			{
				path: "/",
				element: <Index />
			},
			{
				path: "mi-pokedex",
				element: <Pokedex />
			},
			{
				path: "mi-pokedex/editar/:id",
				element: <Pokemon_editar />
			},
			{
				path: "mi-pokedex/puntaje/:id",
				element: <Pokemon_puntaje />
			},
			{
				path: "mi-pokedex/:id",
				element: <Pokemon />,
			}
		]
	}
])