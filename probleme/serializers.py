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

class ProblemeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Probleme
        fields = '__all__'

class ProblemePostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Probleme
        fields=('probeleme','locataire','post_date','car')

class ProblemeUpdateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Probleme
        fields = ('response_date', 'response', 'garage_manager')
