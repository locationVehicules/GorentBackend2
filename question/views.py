from django.shortcuts import render
from multiprocessing import context
from pdb import post_mortem
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import *
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import *
from administration.decorators import allowedUsers, notLoggedUsers
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from .serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['admin'])
@api_view(['GET'])
def QuestionList(request):
    Questions = Question.objects.all()
    if Questions:
        serialiers = QuestionSerializers(Questions, many=True)
        return Response(serialiers.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['admin'])
@api_view(['GET'])
def QuestionDetail(request, pk):
    Questions = Question.objects.get(id=pk)
    if Questions:
        serialier = QuestionSerializers(Questions, many=False)
        return Response(serialier.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['locataire', 'admin'])
# @api_view(['POST'])
# def AddQuestion(request):
#     serializer = QuestionSerializers(data=request.data)
#     # if Question.objects.filter(**request.data).exists():
#     #     raise serializers.ValidationError('This data already exists')
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     else:
#         return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['admin'])
@api_view(['POST'])
def QuestionUpdate(request, pk):
    Questions = Question.objects.get(id=pk)
    serializer = QuestionSerializers(instance=Questions, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['locataire', 'admin'])
@api_view(['DELETE'])
def deleteQuestion(request, pk):
    Questions = Question.objects.get(id=pk)
    Questions.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def postQuestion(request):
    serializer = PostQuestionSerializers(data=request.data)
    # if Question.objects.filter(**request.data).exists():
    #     raise serializers.ValidationError('This data already exists')
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
