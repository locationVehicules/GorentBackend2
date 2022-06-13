from multiprocessing import context
from pdb import post_mortem
from rest_framework.response import Response
from django.db.models import Q
from reservation.models import Reservation
from reservation.serializers import ReservationSerializer
from .models import *
from django.shortcuts import render, redirect
from .forms import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import *
from .decorators import allowedUsers, notLoggedUsers
from django.core import serializers
from django.http import HttpResponse
from .serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes
from datetime import date
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import api_view, permission_classes,\
    throttle_classes
from rest_framework.generics import UpdateAPIView
from django.utils import timezone
from .email import send_email
from .utility import generateKey,verify_otp,set_token_cookie
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from .utility import set_browser_cookie

@api_view(['POST'])
@permission_classes([AllowAny,])
def signup(request):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        user = User(username = serializer.data['username'],email = serializer.data['email'],)
        try:
            validate_password(serializer.data['password'],user)
        except ValidationError as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.data['password'])
        user.save()
        return Response({"username" :  serializer.data['username'],"email" : serializer.data['email'],"Status" : "Otp has been send!!"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@permission_classes([AllowAny,])
class LoginView(APIView):
    # This view should be accessible also for unauthenticated users.

    def post(self, request, format=None):
        serializer =LoginSerializer(data=self.request.data,context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)

class Logout(APIView):
    
    authentication_classes = []
    

    def post(self,request,format=None):
        response = Response()
        try:
            logout(request)
            response.data = {"Success" : "Logout successfully"}
            return response
        except:
            response.data = {"Fail" : "Something went wrong.Logout fail!!!"}
            return response

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def UserDetail(request, pk):
    if request.method == 'GET':
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def userUpdate(request, pk):
    if request.method == 'POST':
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)






# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])
@api_view(['GET'])
def BlackList(request):
    if request.method == 'GET':
        blackLists = blackList.objects.all()
        if blackLists:
            serialiers = userBlackListSerializers(blackLists, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])
@api_view(['GET'])
def BlackListDetail(request, pk):
    if request.method == 'GET':
        blackLists = blackList.objects.get(id=pk)
        if blackLists:
            serialier = blackListSerializers(blackLists, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])
@api_view(['POST'])
def AddBlackList(request):
    if request.method == 'POST':
        serializer = blackListSerializers(data=request.data)
        if blackList.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')
        if serializer .is_valid():
            serializer .save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])
@api_view(['PUT'])
def BlackListUpdate(request, pk):
    if request.method == 'PUT':
        blackLists = blackList.objects.get(id=pk)
        serializer = blackListSerializers(
            instance=blackLists, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])
@api_view(['DELETE'])
def blackListDelete(request, pk):
    if request.method == 'DELETE':
        blackLists = blackList.objects.get(id=pk)
        blackLists.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])
@api_view(['GET'])
def RenterList(request):
    if request.method == 'GET':
        Renters = Renter.objects.all()
        if Renters:
            serialiers = RenterSerializers(Renters, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['Owner'])


@api_view(['GET'])
def RenterList(request):
    if request.method == 'GET':
        Renters = Renter.objects.all()
        if Renters:
            serialiers = RenterSerializers(Renters, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def RenterDetail(request, pk):
    if request.method == 'GET':
        renter = Renter.objects.get(user_id=pk)
        if renter:
            serialier = RenterSerializers(renter, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])
@api_view(['GET'])
def DriverList(request):
    if request.method == 'GET':
        drivers = UserAccount.objects.extra(
            select={
                'username': "select username from auth_user where auth_user.id=user_id",
                'firstname': "select first_name from auth_user where auth_user.id=user_id",
                'lastname': "select last_name from auth_user where auth_user.id=user_id"},
        ).filter(type_user='driver').values()
        return Response(drivers)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])


@api_view(['GET'])
def EnterpriseDriverList(request, pk):
    if request.method == 'GET':
        try:
            useraccount = UserAccount.objects.get(user_id=pk)
            renter = Renter.objects.get(user_id=useraccount.id)
            entereprise = Entereprise.objects.get(user_id=renter.id)
            drivers = Driver.objects.filter(
                workWith_id=entereprise.id).values('id')
            return Response(drivers)
        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])


@api_view(['GET'])
def DriverDetail(request, pk):
    if request.method == 'GET':
        driver = Driver.objects.get(user_id=pk)
        if driver:
            serialier = DriverSerializers(driver, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def GaragistDetail(request, pk):
    if request.method == 'GET':
        garageManager = garage_manager.objects.get(id=pk)
        if garageManager:
            serialier = garage_managerSerializers(garageManager, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])
@api_view(['GET'])
def AgencyDetail(request, pk):
    if request.method == 'GET':
        agency = Agency.objects.get(location=pk)
        if agency:
            serialier = AgencySerializers(agency, many=False)
            return Response(serialier.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])


@api_view(['POST'])
def AddRenter(request):
    if request.method == 'POST':
        serializer = RenterSerializers(data=request.data)
        if Renter.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')
        if serializer .is_valid():
            serializer .save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])
@api_view(['PUT'])
def RenterUpdate(request, pk):
    if request.method == 'PUT':
        Renters = Renter.objects.get(id=pk)
        serializer = RenterSerializers(instance=Renters, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


# @permission_classes([IsAuthenticated])
# @allowedUsers(allowedGroups=['secretary'])
@api_view(['DELETE'])
def deleteRenter(request, pk):
    if request.method == 'DELETE':
        Renters = Renter.objects.get(id=pk)
        Renters.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


# @permission_classes([IsAuthenticatedOrReadOnly])
@api_view(['POST'])
def viewAllDriverDispo(request):

    if request.method == 'POST':
        issue_date = request.data.get('issue_date')
        return_date = request.data.get('return_date')
        reservations = Reservation.objects.filter(
            issue_date=issue_date, return_date=return_date)
        serializer = ReservationSerializer(reservations, many=True)
        reservation_data = serializer.data
        occupied_driver_id_lists = []
        for i in range(len(reservation_data)):
            occupied_driver_id_lists.append(reservation_data[i]['Driver'])
        occupied_driver_id = list(set(occupied_driver_id_lists))
        Driver.objects.all().update(available=True)
        for driver_id in occupied_driver_id:
            Driver.objects.filter(id=driver_id).update(available=False)
        drivers = Driver.objects.all()
        filters = {'available': True}
        for key, value in filters.items():
            if value is not None:
                drivers = drivers.filter(**{key: value})
        driver_serializer = DriverSerializers(drivers, many=True)

        return Response(driver_serializer.data)


@api_view(['GET'])
def SalariesList(request):
    if request.method == 'GET':
        salaries = Salaries.objects.all()
        if salaries:
            serialiers = SalariesSerializers(salaries, many=True)
            return Response(serialiers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def SalariesUpdate(request, pk):
    if request.method == 'PUT':

        salaries = Salaries.objects.get(id=pk)
        serializer = SalariesSerializers(instance=salaries, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
