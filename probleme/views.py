from django.shortcuts import render
from multiprocessing import context
from pdb import post_mortem
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import *
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import  *
from administration.decorators import allowedUsers,notLoggedUsers
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from .serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly,AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token 
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication



# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['GET'])
def ProblemeList(request, pk):
  if request.method == 'GET': 
    Problemes = Probleme.objects.filter(car=pk, response=False)
    if Problemes:
      serialiers=ProblemeSerializers(Problemes,many=True)
      return Response(serialiers.data)
    else:
      return JsonResponse({"noProblem": "No problem"})

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['GET'])
def ProblemeDetail(request,pk):
 if request.method == 'GET': 
    Problemes=Probleme.objects.get(id=pk)
    if Problemes:
      serialier=ProblemeSerializers(Problemes,many=False)
      return Response(serialier.data)
    else:
      return Response(status=status.HTTP_404_NOT_FOUND)


@permission_classes([IsAuthenticated])
@allowedUsers(allowedGroups=['garage_manager'])
@api_view(['POST'])
def AddProbleme(request):
 if request.method == 'GET': 
        serializer= ProblemePostSerializers(data=request.data)
        if  Probleme.objects.filter(**request.data).exists():
          raise serializers.ValidationError('This data already exists')
        if serializer .is_valid():
                serializer .save()
                return Response(serializer.data)
        else:
          return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['PUT'])
def ProblemeUpdate(request, pk):
 if request.method == 'PUT': 
    Problemes=Probleme.objects.get(id=pk)
    serializer = ProblemeUpdateSerializers(instance=Problemes,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
         return Response(serializer.errors) 

@permission_classes([IsAuthenticated])
@allowedUsers(allowedGroups=['Renter','garage_manager'])
@api_view(['DELETE'])
def deleteProbleme(request, pk):
  if request.method == 'DELETE':
    Problemes=Probleme.objects.get(id=pk)
    Problemes.delete()
    return Response(status=status.HTTP_202_ACCEPTED)

