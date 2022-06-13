from rest_framework import generics
import json
from datetime import date
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *


@api_view(['POST'])
def reservationCar(request):
    if request.method == 'POST':
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def ReservationUpdate(request, pk):
    if request.method == 'PUT':
        reservation = Reservation.objects.get(id=pk)
        serializer = ReservationSerializer(
            instance=reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['GET'])
def reservationsList(request):
    if request.method == 'GET':
        reservations = Reservation.objects.all().extra(
            select={
                'RenterFName': "select first_name from auth_user where auth_user.id=Renter_id",
                'RenterLName': "select last_name from auth_user where auth_user.id=Renter_id",
                'photo': "select photo from cars_car where cars_car.id=car_rented_id",
                'carNum': "select matricule from cars_car where cars_car.id=car_rented_id",
                'carName': "select name from cars_car where cars_car.id=car_rented_id"},
        ).values()
        return Response(reservations)


@api_view(['GET'])
def UserReservationsList(request, pk):
    if request.method == 'GET':
        try:
            driver = Driver.objects.get(user_id=pk).id
        except Driver.DoesNotExist:
            driver = None
        reservations = Reservation.objects.all().filter(
            Q(Driver_id=driver) | Q(Renter_id=pk)).extra(
            select={
                'RenterFName': "select first_name from auth_user where auth_user.id=Renter_id",
                'RenterLName': "select last_name from auth_user where auth_user.id=Renter_id",
                'photo': "select photo from cars_car where cars_car.id=car_rented_id",
                'carNum': "select matricule from cars_car where cars_car.id=car_rented_id",
                'carName': "select name from cars_car where cars_car.id=car_rented_id"},
        ).values()
        return Response(reservations)


@api_view(['GET'])
def reservationDetail(request, pk):
    try:
        reservation = Reservation.objects.get(id=pk)
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DetailReservationSerializer(reservation)
        return Response(serializer.data)


# @api_view(['POST'])
# def reservationCar(request):
#     if request.method == 'POST':
#         serializer = ReservationSerializer(data=request.data)

#         if serializer.is_valid():
#             current_date = date.today()
#             issue_date = serializer.validated_data['issue_date']
#             return_date = serializer.validated_data['return_date']
#             tool_rented=serializer.validated_data['tool_rented']

#             car_rented = serializer.validated_data['car_rented']
#             #hena yjib reservation te3 hedik tonobile
#             reservations = Reservation.objects.all().filter(car_rented=car_rented)
#              #hena yjib reservation te3 hedik tonoible b hedik la date
#             # Check if the issue_date of new reservation doesn't clash with any previous reservations
#             for r in reservations:
#                 #lkan 3adet tonobile makriya fi la date te hedik cbn sinon ma9bola
#                 if r.issue_date <= issue_date <= r.return_date:
#                     content = {"message":"The selected car or tool  are not available on this date"}
#                     return Response(data=json.dumps(content), status=status.HTTP_400_BAD_REQUEST)
#             # Check whether issue_date is not older than today's date, and is less equal to return_date
#             if current_date <= issue_date and issue_date <= return_date:
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def ExtendReservationDate(request, pk):
    try:
        reservation = Reservation.objects.get(id=pk)
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ReservationSerializer(reservation, data=request.data)

        if serializer.is_valid():
            current_date = date.today()
            issue_date = serializer.validated_data['issue_date']
            return_date = serializer.validated_data['return_date']
            car = serializer.validated_data['car']
            tool = serializer.validated_data['tool_rented']

            reservations = Reservation.objects.all().filter(car=car.id, tool=tool.id)

            # hena ychouf les reservations kaml te3 tonobile hedi wa ychouf lkan marahich makriya mabin les dates hedouk
            for r in reservations:
                if r.issue_date <= return_date <= r.return_date:
                    res = {
                        "message": "Failed to extend the date. Car is not available."}
                    return Response(data=json.dumps(res), status=status.HTTP_400_BAD_REQUEST)

            # hena ychouf bli lazm ydir 9bal b nhar
            if current_date-1 >= issue_date:
                res = {"message": "Failed to extend the date. your are too late."}
                return Response(data=json.dumps(res), status=status.HTTP_400_BAD_REQUEST)
            elif current_date <= issue_date and issue_date <= return_date:
                serializer.save()
                return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def cancelreservation(request, pk):
    try:
        reservation = Reservation.objects.get(id=pk)
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
