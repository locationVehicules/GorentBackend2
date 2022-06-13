from django.shortcuts import redirect
from django.http import HttpResponse
from .models import UserAccount
from django.contrib.auth.models import User,Group
from django.http import HttpResponse,HttpResponseNotFound

def notLoggedUsers(view_func):
    def wrapper_func(request , *args,**kwargs):
        if request.user.is_authenticated:
            return HttpResponse('<h1>u must log out</h1>')
        else:
            return view_func(request , *args,**kwargs)
    return wrapper_func


def allowedUsers(allowedGroups=[]):
    def decorator(view_func):
        def wrapper_func(request , *args,**kwargs): 
            group = 'None'
            if request.user.groups.exists():
               group =  request.user.groups.all()[0].name
            if group in allowedGroups:
               return view_func(request , *args,**kwargs)
            else:
                return HttpResponseNotFound('<h1>Page not found</h1>')
            
        return wrapper_func
    return decorator
