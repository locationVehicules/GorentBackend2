from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('AddContrat/', views.AddContrat, name="AddContart"),
    path('ContratList/', views.ContratList, name="ContartList"),
    path('ContratUpdate/<str:pk>', views.ContratUpdate, name="ContartUpdate"),
    
    path('ContratDetail/<str:pk>', views.ContratDetail, name="ContartDetail"),
    path('deleteContrat/<str:pk>', views.deleteContrat, name="deleteContart"), ]
