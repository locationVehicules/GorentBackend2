from django.shortcuts import render
from multiprocessing import context
from pdb import post_mortem
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from cars.serializers import CarSerializer
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
from .serializers import ContratSerializers
from bill.models import *


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['GET'])
def ContratList(request):
    if request.method == 'GET':
        Contrats = Contrat.objects.all()
        if Contrats:
            serialiers = ContratSerializers(Contrats, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])


@api_view(['GET'])
def ContratDetail(request, pk):
    if request.method == 'GET':
        Contrats = Contrat.objects.get(id=pk)
        if Contrats:
            serialier = ContratSerializers(Contrats, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['POST'])
def AddContrat(request):
    if request.method == 'POST':
        serializer = ContratSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.save()
            return Response(serializer.data)
        else:
         #  return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.errors)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['PUT'])
def ContratUpdate(request, pk):
    if request.method == 'PUT':
        Contrats = Contrat.objects.get(id=pk)
        serializer = ContratSerializers(instance=Contrats, data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter','garage_manager'])


@api_view(['DELETE'])
def deleteContrat(request, pk):
    if request.method == 'DELETE':
        Contrats = Contrat.objects.get(id=pk)
        Contrats.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
