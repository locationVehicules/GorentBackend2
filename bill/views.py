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
# @allowedUsers(allowedGroups=['Renter'])
# @api_view(['GET'])
# def BillList(request):
#   if request.method == 'GET':
#     Bills = Bill.objects.all()
#     if Bills:
#      serialiers = BillSerializers(Bills, many=True)
#      return Response(serialiers.data)
#     else:
#        return Response(status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter'])
@api_view(['GET'])
def BillList(request):
    if request.method == 'GET':
        Bills = Bill.objects.all()
        if Bills:
            serialiers = getBillSerializers(Bills, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter'])


@api_view(['GET'])
def BillDetail(request, pk):
    if request.method == 'GET':
        Bills = Bill.objects.get(id=pk)
        if Bills:
            serialier = BillSerializers(Bills, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter'])
@api_view(['POST'])
def AddBill(request):
    if request.method == 'POST':
        serializer = BillSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
          # return Response(status=status.HTTP_404_NOT_FOUND)


@permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['PUT'])
def BillUpdate(request, pk):
    if request.method == 'PUT':
        Bills = Bill.objects.get(id=pk)
        serializer = BillSerializers(instance=Bills, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['DELETE'])
def deleteBill(request, pk):
    if request.method == 'DELETE':
        Bills = Bill.objects.get(id=pk)
        Bills.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
