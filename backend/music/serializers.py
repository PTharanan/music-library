from rest_framework import serializers
from .models import Music

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = '__all__'

    def validate_Title(self, value):
        # Title duplicate check
        if Music.objects.filter(Title__iexact=value.strip()).exists():
            raise serializers.ValidationError("This song title already exists. Please choose another title.")
        return value