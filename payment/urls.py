from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('Pay/',
         views.Pay, name='Pay'),
    path('AddPayment/',
         views.AddPayment),
    path('UpdatePayment/<str:pk>',
         views.UpdatePayment),
]
