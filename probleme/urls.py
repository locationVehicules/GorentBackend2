from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('problemeList/<str:pk>', views.ProblemeList, name="ProblemeList"),
    path('problemeDetail/<str:pk>', views.ProblemeDetail, name="ProblemeDetail"),
    path('addprobleme/', views.AddProbleme, name="AddProbleme"),
    path('problemeUpdate/<str:pk>', views.ProblemeUpdate, name="ProblemeUpdate"),
    path('deleteleprobleme/<str:pk>', views.deleteProbleme, name="deleteProbleme"), 
]
