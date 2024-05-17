import json
from django.http import HttpResponse
import requests

from .models import Pokemon


class PokemonApiService:
    @staticmethod
    def get_pokemon_data(name_or_id):
        response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{name_or_id}")
        if response.status_code == 200:
            return response.json()
        else:
            return HttpResponse("Error:datos invalidos", status=400)

    @staticmethod
    def process_pokemon_data(pokemon_data):
        processed_data = {
            "name": pokemon_data["name"],
            "pokemon_id": pokemon_data["id"],
            "types": [type_data["type"]["name"] for type_data in pokemon_data["types"]],
            "abilities": [
                ability_data["ability"]["name"]
                for ability_data in pokemon_data["abilities"]
            ],
            "base_stats": {
                stat_data["stat"]["name"]: stat_data["base_stat"]
                for stat_data in pokemon_data["stats"]
            },
            "height": pokemon_data["height"] / 10,  # Convertir de decímetros a metros
            "weight": pokemon_data["weight"]
            / 10,  # Convertir de hectogramos a kilogramos
            "sprite_url": pokemon_data["sprites"]["front_default"],
        }
        return processed_data

    @staticmethod
    def process_pokemon_data_to_pokedex(pokemon_data):

        processed_data = {
            "name": pokemon_data["name"],
            "pokemon_id": pokemon_data["pokemon_id"],
            "types": [type_data for type_data in pokemon_data["types"]],
            "abilities": [ability_data for ability_data in pokemon_data["abilities"]],
            "base_stats": pokemon_data["base_stats"],
            "height": pokemon_data["height"] / 10,
            "weight": pokemon_data["weight"] / 10,
            "sprite_url": pokemon_data["sprite_url"],
        }

        return processed_data


class ScoreService:
    @staticmethod
    def calculate_score(pokemon: Pokemon):

        stats = json.loads(pokemon.base_stats)
        weight_type = len(pokemon.types) * 0.4
        weight_stats = sum([stats[key] for key in stats]) * 0.3

        weight_abilities = len(pokemon.abilities) * 0.2
        weight_others = (pokemon.height + pokemon.weight) * 0.1
        score = weight_type + weight_stats + weight_abilities + weight_others
        return score
