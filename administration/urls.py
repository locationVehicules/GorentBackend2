from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenRefreshView,TokenVerifyView
from . import views
from .views import signup,LoginView,Logout
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('accountDetail/<str:pk>' ,views.UserDetail, name="UserDetail"),
    path('accountUpdate/<str:pk>' ,views.userUpdate, name="userUpdate"),
    path('BlackList/' ,views.BlackList, name="BlackList"),
    path('BlackListDetail/<str:pk>', views.BlackListDetail, name="BlackListDetail"),
    path('addBlackList/' ,views.AddBlackList, name="AddblackList"),
    path('UpdateBlackList/<str:pk>' ,views.BlackListUpdate  ,name="UpdateBlackList"),
    path('deleteBlackList/<str:pk>' ,views.blackListDelete, name="deleteblackList"),
    path('RenterList/' ,views.RenterList, name="RenterList"),
    path('RenterDetail/<str:pk>', views.RenterDetail, name="RenterDetail"),
    path('DriverDetail/<str:pk>', views.DriverDetail, name="DriverDetail"),
    path('GaragistDetail/<str:pk>', views.GaragistDetail, name="GaragistDetail"),
    path('addRenter/' ,views.AddRenter, name="Addlocataire"),
    path('UpdateRenter/<str:pk>' ,views.RenterUpdate, name="RenterUpdate"),
    path('deleteRenter/<str:pk>' ,views.deleteRenter, name="deleteRenter"),
    path('DriverDispo/', views.viewAllDriverDispo, name="viewAllDriverDispo"),

    path('enterpriseDriverList/<str:pk>',
         views.EnterpriseDriverList, name="EnterpriseDriverList"),
    path('DriverList/', views.DriverList, name="DriverList"),
    path('getAgencyDetail/<str:pk>', views.AgencyDetail, name="getAgencyDetail"),
    
    path('SalariesList/', views.SalariesList, name="SalariesList"),
    path('SalariesUpdate/<str:pk>', views.SalariesUpdate, name="SalariesUpdate"),
    path('signup/', signup,name = "sign_up"),
    path('login/',LoginView.as_view(),name = "login_user"),
    path('Logout/',Logout.as_view(),name = "login_user"),

]