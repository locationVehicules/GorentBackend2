
from cars.models import car
from .models import *
from dataclasses import fields
from rest_framework import serializers
from parcking.models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class ParckingSerializers(serializers.ModelSerializer):
    class Meta:
        model = parcking
        fields = '__all__'

class ScanCarSerilaizers(serializers.ModelSerializer):
    class Meta:
        model=car
        # fields=('matricule',)
        fields=('matricule','etat')
