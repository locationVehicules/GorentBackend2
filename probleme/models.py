from django.db import models
from django.contrib.auth.models import User,AbstractUser
from django.contrib.auth.admin import UserAdmin
from administration.models import UserAccount,garage_manager,Driver
from cars.models import car
import datetime

class Probleme(models.Model):
     TYPE_PROBLEME=[
          ('mechanical', 'mechanical'),
          ('electrical', 'electrical'),
          ('suspension', 'suspension'),
          ('cleaning', 'cleaning'),
          ('body', 'body'),
          ('other', 'other'),
     ]
     id=models.AutoField(primary_key=True)
     locataire = models.ForeignKey(Driver, on_delete=models.CASCADE, null=False)
     probeleme=models.CharField(max_length=250,blank=False,null=False)
     post_date = models.DateField(
         ("Date"), default=datetime.date.today)
     type = models.CharField(max_length=50, choices=TYPE_PROBLEME, null=False)
     car=models.ForeignKey(car,null=False,on_delete=models.CASCADE)
     
     response = models.BooleanField(default=False)
     response_date = models.DateField(("Date"), null=True)
     garage_manager=models.ForeignKey(garage_manager,null=True,on_delete=models.CASCADE)
   
