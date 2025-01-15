from django.db import models
from django.contrib.auth.models import User
from . import utils

# Create your models here.

class MyLink(models.Model):
  source_link = models.CharField(max_length=300)
  hash = models.CharField(max_length=50, default=utils.generate_unique_hash, unique=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
  
  def __str__(self):
    return self.hash