
from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from . import views


urlpatterns = [

path('reclamationList', views.reclamationList, name="reclamationList"),
path('reclamationDetail/<str:pk>', views.reclamationDetail, name="reclamationDetail"),
path('reclamationCreate', views.reclamationCreate, name="reclamationCreate"),
path('reclamationUpdate/<str:pk>', views.reclamationUpdate  , name="reclamationUpdate"),
path('reclamationDelete/<str:pk>', views.reclamationDelete  , name="reclamationDelete"),
]