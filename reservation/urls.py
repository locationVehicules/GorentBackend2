from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework.authtoken import views
from . import views


urlpatterns = [
    path('reservationCar/', views.reservationCar, name="reservationCar"),
    path('userReservationList/<str:pk>',
         views.UserReservationsList, name="userReservationsList"),
    path('ReservationUpdate/<str:pk>', views.ReservationUpdate, name="ReservationUpdate"),

    path('reservationList/', views.reservationsList, name="reservationsList"),
    path('reservationDetail/<str:pk>',
         views.reservationDetail, name="reservationDetail"),
    path('ExtendReservationDate/<str:pk>',
         views.ExtendReservationDate, name="ExtendReservationDate"),
    path('cancelreservation/<str:pk>', views.cancelreservation, name="cancelreservation"), ]
