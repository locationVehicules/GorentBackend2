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
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes



# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['owner'])
@api_view(['GET'])
def reclamationList(request):
    reclamations = reclamation.objects.all()
    if reclamations:
        serialier = reclamationSerializers(reclamations, many=True)
        return Response(serialier.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['owner'])
@api_view(['GET'])
def reclamationDetail(request, pk):
    reclamations = reclamation.objects.get(id=pk)
    if reclamations:
        serialier = reclamationSerializers(reclamations, many=False)
        return Response(serialier.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['renter'])
@api_view(['POST'])
def reclamationCreate(request):
    serializer = reclamationSerializers(data=request.data)
    # if reclamation.objects.filter(**request.data).exists():
    #     raise serializers.ValidationError('This data already exists')
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['owner'])
@api_view(['POST'])
def reclamationUpdate(request, pk):
    reclamations = reclamation.objects.get(id=pk)
    serializer = reclamationSerializers(
        instance=reclamations, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['renter','owner'])
@api_view(['DELETE'])
def reclamationDelete(request, pk):
    reclamations = reclamation.objects.get(id=pk)

    reclamations.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
