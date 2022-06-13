from django.db import models

# Create your models here.
class parcking(models.Model):
     id=models.AutoField(primary_key=True)
     adresse=models.CharField(max_length=250)
     capacite=models.IntegerField(default=0)
     name=models.CharField(max_length=50)
     localisation=models.CharField(max_length=250)

