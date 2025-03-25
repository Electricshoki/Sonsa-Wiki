from django.db import models
from django.utils import timezone

class Profile(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=100)
    sections = models.JSONField(null=True, blank=True)   # ← 여기를 수정
    footnotes = models.JSONField(null=True, blank=True)  # ← 함께 적용 권장

    def __str__(self):
        return self.name
    
class ProfileEditHistory(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    editor_id = models.CharField(max_length=50)
    edited_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.profile.name} edited by {self.editor_id}"