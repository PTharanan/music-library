from rest_framework import generics, serializers
from .models import Music
from .serializers import MusicSerializer
import os
from django.conf import settings

class MusicListCreateView(generics.ListCreateAPIView):
    queryset = Music.objects.all().order_by('-id')
    serializer_class = MusicSerializer

    def perform_create(self, serializer):
        file = self.request.FILES.get("File")

        # Check if file exists
        if not file:
            raise serializers.ValidationError({"File": "Audio file is required"})

        # 1. Size validation (max 5MB)
        max_size = 5 * 1024 * 1024  # 5MB
        if file.size > max_size:
            raise serializers.ValidationError({"File": "File size must be less than 5MB"})

        # 2. MIME type validation (must start with audio/)
        if not file.content_type.startswith("audio/"):
            raise serializers.ValidationError({"File": "Only audio files are allowed"})

        # 3. Extension validation
        allowed_extensions = ['mp3', 'wav', 'm4a', 'ogg']
        ext = file.name.split('.')[-1].lower()

        if ext not in allowed_extensions:
            raise serializers.ValidationError({"File": f"Unsupported audio format: .{ext}"})

        # If all validations pass → save
        serializer.save()

class MusicDeleteView(generics.DestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

    def perform_destroy(self, instance):
        # file path
        file_path = instance.File.path
        # delete file
        if os.path.isfile(file_path):
            os.remove(file_path)
        # DB record delete
        instance.delete()