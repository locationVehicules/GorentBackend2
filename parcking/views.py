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


#@permission_classes([IsAuthenticatedOrReadOnly])
#@allowedUsers(allowedGroups=['Renter'])
@api_view(['GET'])
def ParckingList(request):
 if request.method == 'GET': 
    parckings=parcking.objects.all()
    if parckings:
      serialier=ParckingSerializers(parckings,many=True)
      return Response(serialier.data)
    else:
       return Response(status=status.HTTP_404_NOT_FOUND)

#@allowedUsers(allowedGroups=['Renter'])
#@permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET'])
def ParckingDetail(request,pk):
 if request.method == 'GET': 
    parckings= parcking.objects.get(id=pk)
    if parckings:
      serialier=ParckingSerializers(parckings,many=False)
      return Response(serialier.data)
    else:
       return Response(status=status.HTTP_404_NOT_FOUND)

#@permission_classes([IsAuthenticated])
#@allowedUsers(allowedGroups=['garage_manager'])
@api_view(['POST'])
def Addparcking(request):
  if request.method == 'POST':
        serializer= ParckingSerializers(data=request.data)
        if  parcking.objects.filter(**request.data).exists():
          raise serializers.ValidationError('This data already exists')
        if serializer .is_valid():
                serializer .save()
                return Response(serializer.data)
        else:
          return Response(status=status.HTTP_404_NOT_FOUND)


#@permission_classes([IsAuthenticated])
#@allowedUsers(allowedGroups=['garage_manager'])
@api_view(['PUT'])
def parckingUpdate(request, pk):
  if request.method == 'PUT':
    parckings=parcking.objects.get(id=pk)
    serializer = ParckingSerializers(instance=parckings,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
         return Response(serializer.errors) 

#@permission_classes([IsAuthenticated])
#@allowedUsers(allowedGroups=['Renter','garage_manager'])
@api_view(['DELETE'])
def deleteParcking(request, pk):
  if request.method == 'DELETE':
    parckings=parcking.objects.get(id=pk)
    parckings.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


#@permission_classes([IsAuthenticated])
#@allowedUsers(allowedGroups=['garage_manager'])
@api_view(['PUT'])
def CheckCar(request):
  if request.method == 'PUT':
    serializer = ScanCarSerilaizers(data=request.data)
    car = car.objects.filter(**request.data)
    if car.exists() and serializer .is_valid():
      serializer .save()
      return Response(serializer.data)
    else:
      return Response(status=status.HTTP_404_NOT_FOUND)
