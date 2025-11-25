from django.db import models

class Music(models.Model):
    Title = models.CharField(max_length=200)
    File = models.FileField(upload_to="music/")
    # google_drive_url = models.URLField(max_length=500, blank=True, null=True)
    Date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Title
