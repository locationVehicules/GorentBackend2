from django.db import models
from django.core import validators
import datetime


class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    METHOD_Pay = [
        ('On Ligne', 'On Ligne'),
        ('On Spot', 'On Spot'),
    ]
    method_paiment = models.CharField(max_length=10, choices=METHOD_Pay)
    Receipt = models.IntegerField(unique=True, null=True)
    date = models.DateTimeField(auto_now=False, auto_now_add=False,
                                default=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S+00:00"))
    cardNum = models.CharField(max_length=20, null=True)
    exDate = models.DateField(null=True)
    cardName = models.CharField(max_length=25, null=True)
    Amount = models.FloatField(default=0)
    nbHour = models.IntegerField(default=0, null=False)
    nbDay = models.IntegerField(default=0, null=False)
