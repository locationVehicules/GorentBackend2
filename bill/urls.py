from django.urls import path,include
from django.contrib import admin
from . import views

urlpatterns = [
path('BillList/' ,views.BillList, name="BillList"),
path('BillDetail/<str:pk>' ,views.BillDetail, name="BillDetail"),
path('AddBill/' ,views.AddBill, name="AddBill"),
path('BillUpdate/<str:pk>' ,views.BillUpdate, name="BillUpdate"),
path('deleteBill/<str:pk>' ,views.deleteBill, name="deleteBill"),]
