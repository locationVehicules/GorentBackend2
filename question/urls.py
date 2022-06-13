from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from . import views
 

urlpatterns = [

path('QuestionList/' ,views.QuestionList, name="QuestionList"),
path('QuestionDetail/<str:pk>' ,views.QuestionDetail, name="QuestionDetail"),
# path('AddQuestion/' ,views.AddQuestion, name="AddQuestion"),
path('QuestionUpdate/<str:pk>' ,views.QuestionUpdate, name="QuestionUpdate"),
path('deleteQuestion/<str:pk>' ,views.deleteQuestion, name="deleteQuestion"),
path('postQuestion/' ,views.postQuestion, name="postQuestion"),]