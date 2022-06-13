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



class QuestionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class PostQuestionSerializers(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields = ('question', 'Renter', 'post_date')
