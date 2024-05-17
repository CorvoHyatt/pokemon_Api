from django.urls import path
from . import views

urlpatterns = [
    path("pokemon/create", views.create_pokemon, name="create_pokemon"),
    path("pokemon/all", views.get_all_pokemon, name="get_all_pokemon"),
    path("pokemon/<str:pokemon_name_or_id>", views.get_pokemon, name="get_pokemon"),
    path("pokemon/delete/<int:id>", views.delete_pokemon, name="delete_pokemon"),
    path("pokemon/update/<int:id>", views.update_pokemon, name="update_pokemon"),
    path(
        "pokemon/details/<int:id>",
        views.get_pokemon_details,
        name="get_pokemon_details",
    ),
    path(
        "pokemon/score/<int:id>",
        views.calculate_pokemon_score,
        name="calculate_pokemon_score",
    ),
]
