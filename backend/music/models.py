from django.db import models

class Music(models.Model):
    Title = models.CharField(max_length=200)
    File = models.FileField(upload_to="music/")
    Date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Title
