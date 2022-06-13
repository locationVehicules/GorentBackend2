from dataclasses import fields
from django.contrib import admin
from django.contrib.auth.models import User,AbstractUser
from django.contrib.auth.admin import UserAdmin


from django.db import models
from .models import *

class UserInline(admin.StackedInline):
    model=UserAccount
    can_delete=False
    
class constumizeUser(UserAdmin):
    inlines = (UserInline ,)
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('first_name','last_name','groups','email',)}),
    )

admin.site.unregister(User)       
admin.site.register(User,constumizeUser)  

class blacklistAdmin(admin.ModelAdmin):
     model=blackList
     list_display=('user','motif','add_date','user',)
     list_filter=('add_date','user')
     search_fields=('user',)

  


admin.site.register(Renter)


admin.site.register(blackList,blacklistAdmin)


