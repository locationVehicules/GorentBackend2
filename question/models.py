from tkinter.tix import Tree
from django.db import models
from django.contrib.auth.models import User,AbstractUser
from django.contrib.auth.admin import UserAdmin
from administration.models import UserAccount,Renter
# Create your models here.
import datetime

class Question(models.Model):
     id=models.AutoField(primary_key=True)
     question=models.CharField(max_length=250,blank=False,null=False)
     response=models.CharField(max_length=250,blank=False,null=True)
     admin=models.ForeignKey(UserAccount,null=True,on_delete=models.CASCADE)
     Renter=models.ForeignKey(Renter,on_delete=models.CASCADE)   
     post_date=models.DateField(("Date"),default=datetime.date.today) 
     response_date = models.DateField(
         ("Date"), null=True)
   
