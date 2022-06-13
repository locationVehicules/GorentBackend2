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


class BillSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'


class getBillSerializers(serializers.ModelSerializer):
    Amount = serializers.SerializerMethodField('add_amount')

    class Meta:
        model = Bill
        fields = ('Amount',
                  'Contrat_id',
                  'PDFBill',
                  'id',
                  'current_date',
                  'payment_id',
                  'promotion')

    def add_amount(self, bill):
        amount = Payment.objects.get(id=bill.payment_id).Amount
        return amount
