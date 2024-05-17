from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Pokemon
from .serializers import PokemonSerializer
from .services import PokemonApiService, ScoreService


@api_view(["GET"])
def get_pokemon(request, pokemon_name_or_id):

    pokemon_data = PokemonApiService.get_pokemon_data(pokemon_name_or_id)
    if pokemon_data:
        processed_data = PokemonApiService.process_pokemon_data(pokemon_data)
        return Response(processed_data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Pokemon not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
def create_pokemon(request):

    pokemon_data = request.data
    if pokemon_data:
        processed_data = PokemonApiService.process_pokemon_data_to_pokedex(pokemon_data)
        serializer = PokemonSerializer(data=processed_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"error": "Pokemon not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["PUT"])
def update_pokemon(request, id):
    try:
        pokemon = Pokemon.objects.get(pk=id)
    except Pokemon.DoesNotExist:
        return Response(
            {"error": "Pokemon not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = PokemonSerializer(pokemon, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_pokemon(request, id):
    try:
        pokemon = Pokemon.objects.get(pk=id)
    except Pokemon.DoesNotExist:
        return Response(
            {"error": "Pokemon not found"}, status=status.HTTP_404_NOT_FOUND
        )

    pokemon.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def get_pokemon_details(request, id):
    try:
        pokemon = Pokemon.objects.get(pk=id)
    except Pokemon.DoesNotExist:
        return Response(
            {"error": "Pokemon not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = PokemonSerializer(pokemon)
    return Response(serializer.data)


@api_view(["GET"])
def get_all_pokemon(request):
    pokemons = Pokemon.objects.all()
    serializer = PokemonSerializer(pokemons, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def calculate_pokemon_score(request, id):
    try:
        pokemon = Pokemon.objects.get(pk=id)
    except Pokemon.DoesNotExist:
        return Response(
            {"error": "Pokemon not found"}, status=status.HTTP_404_NOT_FOUND
        )

    score = ScoreService.calculate_score(pokemon)
    return Response({"score": score})
