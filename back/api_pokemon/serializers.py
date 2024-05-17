import json
from rest_framework import serializers
from .models import Pokemon


class CustomJSONField(serializers.Field):
    def to_representation(self, value):
        return json.loads(value)

    def to_internal_value(self, data):
        return json.dumps(data)


class PokemonSerializer(serializers.ModelSerializer):
    base_stats = CustomJSONField()

    class Meta:
        model = Pokemon
        fields = "__all__"
