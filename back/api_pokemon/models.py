from django.db import models


class Pokemon(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    pokemon_id = models.PositiveIntegerField(unique=True)
    types = models.JSONField(null=True, blank=True)
    abilities = models.JSONField(null=True, blank=True)
    base_stats = models.JSONField()
    height = models.FloatField()
    weight = models.FloatField()
    sprite_url = models.URLField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "pokemon"
