from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from reclamation.models import *
from .models import *


class reclamationForm(ModelForm):
    class Meta:
        model=reclamation
        fields ="__all__"
