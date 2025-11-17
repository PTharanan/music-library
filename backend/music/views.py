from rest_framework import generics
from .models import Music
from .serializers import MusicSerializer
import os
from django.conf import settings

class MusicListCreateView(generics.ListCreateAPIView):
    queryset = Music.objects.all().order_by('-id')
    serializer_class = MusicSerializer

class MusicDeleteView(generics.DestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

    def perform_destroy(self, instance):
        # file path எடுத்து
        file_path = instance.File.path
        # instance delete பண்ணும் முன் file நீக்கு
        if os.path.isfile(file_path):
            os.remove(file_path)
        # DB record delete பண்ணு
        instance.delete()