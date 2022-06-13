from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework.authtoken import views

from . import views

urlpatterns = [
    path('carsList/', views.CarsList, name="CarsList"),
    path('carDetail/<str:pk>', views.CarDetail, name="CarDetail"),
    path('ViewCarsDispo/', views.view_all_cars_on_given_date, name="ViewCarsDispo"),
    path('ViewToolDispo/', views.view_all_tools_on_given_date, name="ViewToolDispo"),
    path('UpdateCarPrice/<str:pk>', views.UpdateCarPrice, name="UpdateCarPrice"),
    path('UpdateToolPrice/<str:pk>', views.UpdateToolPrice, name="UpdateToolPrice"),
    path('UpdateCarParking/<str:pk>',
         views.UpdateCarParking, name="UpdateCarParking"),
     path('UpdateToolParking/<str:pk>',
         views.UpdateToolParking, name="UpdateToolParking"),
    path('UpdateCarState/<str:pk>',
         views.UpdateCarState, name="UpdateCarState"),
    path('DeleteCar/<str:pk>',
         views.DeleteCar, name="DeleteCar"),
     path('DeleteTool/<str:pk>',
         views.DeleteTool, name="DeleteTool"),
    
    path('AddCar/',
         views.AddCar, name="AddCar"),
    path('AddTool/', views.ToolAdd, name="ToolAdd"),

    path('toolList/', views.ToolList, name="ToolList"),
    path('carDetail/<str:pk>', views.CarDetail, name="CarDetail"),
    path('toolDetail/<str:pk>', views.ToolDetail, name="ToolDetail"),
    path('idCarDetail/<str:pk>', views.idCarDetail, name="idCarDetail"),
    path('ToolUpdate/', views.ToolUpdate, name="ToolUpdate"),
    path('deleteTool/', views.deleteTool, name="deleteTool"),

]
