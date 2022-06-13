from dataclasses import fields
from rest_framework import serializers
from .models import *
from parcking.models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = car
        fields = '__all__'


class UpdatePriceCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = car
        fields = ('priceH', 'priceD')

class UpdatePriceToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = tool
        fields = ['price']

class UpdateParkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = car
        fields = ('parking', 'spotLetter', 'spotNumber')

class UpdateToolParkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = tool
        fields = ['parking']

class DeleteCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = car
        fields = ['etat']
class DeleteToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = tool
        fields = ['etat']

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = tool
        fields = '__all__'

class FavoriteCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = tool
        fields = ('price',)
