from django.contrib import admin
from django.db import models
from .models import *

# Register your models here.
class questionAdmin(admin.ModelAdmin):
     model=Question
     readonly_fields=('question','Renter','post_date',)
     list_display=('response','question','post_date','response_date',)
     list_filter=('Renter','admin','post_date','response_date',)
     search_fields=('Renter','admin')
     list_display_links=('question',)
admin.site.register(Question,questionAdmin)