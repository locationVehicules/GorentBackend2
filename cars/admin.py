from django.contrib import admin
from dataclasses import fields
from django.contrib import admin
from django.contrib.auth.models import User,AbstractUser
from django.contrib.auth.admin import UserAdmin
from .models import car, tool
# Register your models here.
class carAdmin(admin.ModelAdmin):
    model=car
    list_display=('matricule','name','modele','type','buy_year','gear_box','nb_place','couleur','etat','moteur_type')
    list_filter=('modele','type','gear_box','nb_place','etat','moteur_type')
    search_fields=('matricule','name')


admin.site.register(car,carAdmin) 
class toolAdmin(admin.ModelAdmin):
    model=tool
    list_display=('name','price','etat')
    list_filter=('name','etat')
    search_fields=('name','etat')


admin.site.register(tool,toolAdmin) 