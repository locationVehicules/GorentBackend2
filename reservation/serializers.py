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


'''class ContratPostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contrat
        fields = '__all__'
        #exclude = ['reservation_id','date_issue','date_fin']
        read_only_fields = ('reservation_id','return_date','issue_date')

class ReservationSerializer(serializers.ModelSerializer):
  #zedt post hena 
  Contrat=ContratPostSerializers()
  class Meta:
    model = Reservation
    fields = '__all__'
  
  def create(self, validated_data):
        Contrats= validated_data.pop('Contrat')
        Reservations= Reservation.objects.create(**validated_data)
        Contrat.objects.create(reservation_id=Reservations,
        issue_date=Reservations.issue_date,
        return_date=Reservations.return_date,
                    
                              **Contrats)
        return Reservations
      '''


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class DetailReservationSerializer(serializers.ModelSerializer):

    RenterFName = serializers.SerializerMethodField('get_RenterFName')
    RenterLName = serializers.SerializerMethodField('get_RenterLName')
    DriverFName = serializers.SerializerMethodField('get_DriverFName')
    DriverLName = serializers.SerializerMethodField('get_DriverLName')
    DriveruserID = serializers.SerializerMethodField('get_DriveruserID')

    class Meta:
        model = Reservation
        fields = ('id',
                  'issue_date',
                  'return_date',
                  'issue_location',
                  'return_location',
                  'car_rented',
                  'tool_rented',
                  'sort_checker',
                  'enter_checker',
                  'Driver',
                  'Renter',
                  'state',
                  'RenterFName',
                  'RenterLName',
                  'DriverFName',
                  'DriverLName',
                  'DriveruserID'
                  )

    def get_RenterFName(self, reservation):
        RenterFName = UserAccount.objects.get(id=reservation.Renter.user.id)
        RenterFName = User.objects.get(username=RenterFName.user).first_name
        return RenterFName

    def get_RenterLName(self, reservation):
        RenterLName = UserAccount.objects.get(id=reservation.Renter.user.id)
        RenterLName = User.objects.get(username=RenterLName.user).last_name
        return RenterLName

    def get_DriverFName(self, reservation):
        DriverFName = UserAccount.objects.get(id=reservation.Driver.user.id)
        DriverFName = User.objects.get(username=DriverFName.user).first_name
        return DriverFName

    def get_DriverLName(self, reservation):
        DriverLName = UserAccount.objects.get(id=reservation.Driver.user.id)
        DriverLName = User.objects.get(username=DriverLName.user).last_name
        return DriverLName

    def get_DriveruserID(self, reservation):
        DriveruserID = reservation.Driver.user.id
        return DriveruserID
