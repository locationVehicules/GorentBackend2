import json
from multiprocessing import context
from pdb import post_mortem
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from reservation.models import Reservation
from reservation.serializers import ReservationSerializer
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
from django.db.models import Q

from datetime import date

# @permission_classes([IsAuthenticatedOrReadOnly])
# @allowedUsers(allowedGroups=['Renter'])
@api_view(['GET'])
def CarsList(request):
    if request.method == 'GET':
        cars = car.objects.all()
        if cars:
            serialier = CarSerializer(cars, many=True)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @allowedUsers(allowedGroups=['Renter'])
# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['GET'])
def CarDetail(request, pk):
    if request.method == 'GET':
        cars = car.objects.get(matricule=pk)
        if cars:
            serialier = CarSerializer(cars, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def CarDetail(request, pk):
    if request.method == 'GET':
        tools = tool.objects.get(id=pk)
        if tools:
            serialier = ToolSerializer(tools, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def idCarDetail(request, pk):
    if request.method == 'GET':
        cars = car.objects.get(id=pk)
        if cars:
            serialier = CarSerializer(cars, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @allowedUsers(allowedGroups=['Renter'])
# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['POST'])
def view_all_cars_on_given_date(request):

    if request.method == 'POST':
        serializer = ReservationSerializer(data=request.data)
        issue_date = request.data.get('issue_date')
        return_date = request.data.get('return_date')

        reservations = Reservation.objects.filter(
            issue_date=issue_date, return_date=return_date)
        serializer = ReservationSerializer(reservations, many=True)
        reservation_data = serializer.data
        occupied_car_id_lists = []
        for i in range(len(reservation_data)):
            occupied_car_id_lists.append(reservation_data[i]['car_rented'])
        list_of_car_id = list(set(occupied_car_id_lists))
        car.objects.all().update(etat='available')

        for car_id in list_of_car_id:
            car.objects.filter(id=car_id).update(etat='reserved')
        cars = car.objects.all()
        car_serializer = CarSerializer(cars, many=True)

        return Response(car_serializer.data)

# @allowedUsers(allowedGroups=['Renter'])
# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['POST'])
def view_all_tools_on_given_date(request):
    if request.method == 'POST':
        serializer = ReservationSerializer(data=request.data)
        issue_date = request.data.get('issue_date')
        return_date = request.data.get('return_date')

        reservations = Reservation.objects.filter(
            issue_date=issue_date, return_date=return_date)
        serializer = ReservationSerializer(reservations, many=True)
        reservation_data = serializer.data
        occupied_tools_id_lists = []
        occupied_tools_id_list = []
        for i in range(len(reservation_data)):
            for n in range(len(reservation_data[i]['tool_rented'])):
                occupied_tools_id_list.append(n)
            occupied_tools_id_lists.extend(occupied_tools_id_list)
        list_of_tools_id = list(set(occupied_tools_id_lists))
        tool.objects.all().update(etat='available')

        for tool_id in list_of_tools_id:
            tool.objects.filter(id=tool_id).update(etat='reserved')
        tools = tool.objects.all()
        filters = {'etat': 'available'}
        for key, value in filters.items():
            if value is not None:
                tools = tools.filter(**{key: value})
        tool_serializer = ToolSerializer(tools, many=True)

        return Response(tool_serializer.data)

# @allowedUsers(allowedGroups=['Renter'])
# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['PUT'])
def UpdateCarPrice(request, pk):
    """
    API endpoint for editing a particular car details.
    """
    try:
        cars = car.objects.get(id=pk)
    except cars.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UpdatePriceCarSerializer(cars, data=request.data)

        if serializer.is_valid():
            priceH = serializer.validated_data['priceH']
            priceD = serializer.validated_data['priceD']
            if car.priceH == priceH and car.priceD == priceD:
                content = {"message": "the price of this car are not change "}
                return Response(data=json.dumps(content), status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def UpdateToolPrice(request, pk):
    """
    API endpoint for editing a particular car details.
    """
    try:
        tools = tool.objects.get(id=pk)
    except tool.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UpdatePriceToolSerializer(tools, data=request.data)

        if serializer.is_valid():
            price = serializer.validated_data['price']
            if tool.price == price:
                content = {"message": "the price of this car are not change "}
                return Response(data=json.dumps(content), status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def UpdateCarParking(request, pk):
    try:
        cars = car.objects.get(id=pk)
    except cars.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UpdateParkingSerializer(cars, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def UpdateToolParking(request, pk):
    try:
        tools = tool.objects.get(id=pk)
    except tools.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UpdateToolParkingSerializer(tools, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def UpdateCarState(request, pk):
    try:
        cars = car.objects.get(id=pk)
    except cars.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DeleteCarSerializer(cars, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def DeleteCar(request, pk):
    try:
        cars = car.objects.get(id=pk)
    except cars.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DeleteCarSerializer(cars, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def DeleteTool(request, pk):
    try:
        tools = tool.objects.get(id=pk)
    except cars.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DeleteToolSerializer(tools, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddCar(request):
    if request.method == 'POST':
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter'])
@api_view(['POST'])
def ToolAdd(request):
    if request.method == 'POST':
        serializer = ToolSerializer(data=request.data)
        if serializer .is_valid():
            serializer .save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter'])
@api_view(['GET'])
def ToolList(request):
    if request.method == 'GET':
        tools = tool.objects.all()
        if tools:
            serialiers = ToolSerializer(tools, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Renter'])
@api_view(['GET'])
def ToolDetail(request, pk):
    if request.method == 'GET':
        tools = tool.objects.get(id=pk)
        if tools:
            serialier = ToolSerializer(tools, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['PUT'])
def ToolUpdate(request, pk):
    if request.method == 'PUT':
        tools = tool.objects.get(id=pk)
        serializer = ToolSerializer(instance=tools, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['garage_manager'])
@api_view(['DELETE'])
def deleteTool(request, pk):
    if request.method == 'DELETE':
        tools = tool.objects.get(id=pk)
        tools.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
