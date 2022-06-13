from django.urls import path,include
from django.contrib import admin
from . import views


urlpatterns = [
path('parckingList/' ,views.ParckingList, name="parckingList"),
path('parckingDetail/<str:pk>' ,views.ParckingDetail, name="parckingDetail"),
path('addparcking/' ,views.Addparcking, name="AddParcking"),
path('parckingUpdate/<str:pk>' ,views.parckingUpdate, name="parckingUpdate"),
path('deleteleParcking/<str:pk>' ,views.deleteParcking, name="deleteleParcking"),]