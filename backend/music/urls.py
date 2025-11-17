from django.urls import path
from .views import MusicListCreateView, MusicDeleteView

urlpatterns = [
    path('music/', MusicListCreateView.as_view(), name='music-list'),
    path('music/<int:pk>/', MusicDeleteView.as_view(), name='music-delete'),
]