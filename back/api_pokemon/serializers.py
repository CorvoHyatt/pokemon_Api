import json
from rest_framework import serializers
from .models import Pokemon


class CustomJSONField(serializers.Field):
    def to_representation(self, value):
        # Convierte la cadena JSON almacenada en la base de datos de vuelta a un diccionario
        return json.loads(value)

    def to_internal_value(self, data):
        # Serializa el diccionario a una cadena JSON antes de almacenarlo en la base de datos
        return json.dumps(data)


class PokemonSerializer(serializers.ModelSerializer):
    base_stats = CustomJSONField()

    class Meta:
        model = Pokemon
        fields = "__all__"
