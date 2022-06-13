from django.db import models
from secrets import choice
from django.db import models
from numpy import deprecate
import datetime
from django.contrib.auth.models import User, Group , AbstractUser
from administration.models import Owner, Renter

# Create your models here.
class reclamation(models.Model):
     id=models.AutoField(primary_key=True)
     renter=models.ForeignKey(Renter,on_delete=models.CASCADE)
     Owner = models.ForeignKey(Owner, on_delete=models.CASCADE, null=True)
     motif=models.CharField(max_length=250,blank=False,null=False)
     response=models.CharField(max_length=250,blank=False,null=True)
     post_date=models.DateField(("Date"),default=datetime.date.today) 
     response_date = models.DateField(("Date"), default=datetime.date.today,null=True)
