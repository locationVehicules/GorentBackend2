from re import T
from secrets import choice
from django.db import models
from matplotlib.style import available
from numpy import deprecate
import datetime
from django.contrib.auth.models import User, Group, AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from parcking.models import *
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UserAccount(models.Model):
    GENDER = [
        ('f', 'female'),
        ('m', 'male'),
    ]
    dob = models.DateField(("Date"), default=datetime.date.today)
    phone = models.CharField(max_length=50, unique=True,default='none')
  
    gender = models.CharField(max_length=50, choices=GENDER)
    adress = models.CharField(max_length=50)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, default='yes')
    TYPE_USER = [
        ('admin', 'admin'),
        ('renter', 'renter'),
        ('driver', 'driver'),
        ('owner', 'owner'),
        ('garage_manager', 'garage_manager'),
        ('secretary', 'secretary'),
    ]
    type_user = models.CharField(max_length=50, choices=TYPE_USER)
    otp = models.IntegerField(null=True,blank=True)
    activation_key = models.CharField(max_length=150,blank=True,null=True)
    two_step_verification = models.BooleanField(default = False)
    total_login_devices = models.IntegerField(default=0)
    user_secret_key = models.CharField(max_length=500,null=True,blank=True)
    

    def __str__(self):
        return '%s' %(self.username)

@receiver(post_save, sender=UserAccount)
def create(sender, instance, created, **kwargs):
    if created:
        if instance.type_user == 'secretary':
            secretary.objects.create(user=instance)
        elif instance.type_user == 'Renter':
            Renter.objects.create(user=instance)
        elif instance.type_user == 'Owner':
            Owner.objects.create(user=instance)
        elif instance.type_user == 'garage_manager':
            garage_manager.objects.create(user=instance)
        elif instance.type_user == 'Driver':
            Driver.objects.create(user=instance)


class Renter(models.Model):
    TYPE_RENTER = [
        ('private', 'private'),
        ('business', 'business'),
    ]
    type = models.CharField(max_length=50, choices=TYPE_RENTER)
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)


class Entereprise(models.Model):
    user = models.OneToOneField(Renter, on_delete=models.CASCADE)
    EnterepriseName = models.CharField(max_length=100, blank=True, null=True)
    commercialNum = models.CharField(max_length=50, blank=True, null=True)


class Driver(models.Model):
    TYPE_LICENSE = [
        ("A", "A"),
        ("A1", "A1"),
        ("B", "B"),
        ("C", "C"),
        ("C1", "C1"),
        ("D", "D"),
        ("BE", "BE"),
        ("CE", "CE"),
        ("C1E", "C1E"),
        ("DE", "DE"),
        ("F", "F"),
    ]
    num_license = models.CharField(max_length=18, unique=True)
    issued = models.DateField(("Date"))
    type_license = models.CharField(max_length=3, choices=TYPE_LICENSE)
    image_id = models.ImageField(
        upload_to='Documents\imagesId', blank=False, null=True)
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, unique=True)
    available = models.BooleanField(default=False)
    workWith = models.ForeignKey(
        Entereprise, on_delete=models.CASCADE, blank=True, null=True)


class Infraction(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)
    date = models.DateField(("Date"))
    driver = models.ForeignKey(
        Driver, on_delete=models.CASCADE, null=False)


class Owner(models.Model):
    user = models.OneToOneField(Renter, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)

class Employee(models.Model):
    TYPE = [
        ('admin', 'admin'),
        ('secretary', 'secretary'),
        ('garage manager', 'garage manager')
    ]
    GRADE = [
        ('supervisor', 'supervisor'),
        ('officer', 'officer')
    ]
    user = models.OneToOneField(Renter, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE)
    grade = models.CharField(max_length=20, choices=GRADE)
    ST = models.TimeField(auto_now=False, auto_now_add=False)
    ET = models.TimeField(auto_now=False, auto_now_add=False)
    is_active = models.BooleanField(default=False)


class Salaries(models.Model):
    GRADE = [
        ('supervisor', 'supervisor'),
        ('officer', 'officer')
    ]
    TYPE = [
        ('admin', 'admin'),
        ('secretary', 'secretary'),
        ('garage manager', 'garage manager')
    ]
    type = models.CharField(max_length=20, choices=TYPE)
    grade = models.CharField(max_length=20, choices=GRADE)
    Salary = models.IntegerField(default=0)

    class Meta:
        unique_together = (('type', 'grade'),)


class garage_manager(models.Model):
    user = models.OneToOneField(Employee, on_delete=models.CASCADE)
    parcking = models.ForeignKey(parcking, on_delete=models.CASCADE)


class Admin(models.Model):
    user = models.OneToOneField(Employee, on_delete=models.CASCADE)

class Agency(models.Model):
    LOCATIONS = [
        ("Adrar",  "Adrar"),
        ("Chlef",  "Chlef"),
        ("Laghouat",  "Laghouat"),
        ("Oum El Bouaghi",  "Oum El Bouaghi"),
        ("Batna",  "Batna"),
        ("Béjaïa",  "Béjaïa"),
        ("Biskra",  "Biskra"),
        ("Béchar",  "Béchar"),
        ("Blida",  "Blida"),
        ("Bouira",  "Bouira"),
        ("Tamanrasset",  "Tamanrasset"),
        ("Tébessa",  "Tébessa"),
        ("Tlemcen",  "Tlemcen"),
        ("Tiaret",  "Tiaret"),
        ("Tizi Ouzou",  "Tizi Ouzou"),
        ("Alger",  "Alger"),
        ("Djelfa",  "Djelfa"),
        ("Jijel",  "Jijel"),
        ("Sétif",  "Sétif"),
        ("Saïda",  "Saïda"),
        ("Skikda",  "Skikda"),
        ("Sidi Bel Abbès",  "Sidi Bel Abbès"),
        ("Annaba",  "Annaba"),
        ("Guelma",  "Guelma"),
        ("Constantine",  "Constantine"),
        ("Médéa",  "Médéa"),
        ("Mostaganem",  "Mostaganem"),
        ("M'Sila",  "M'Sila"),
        ("Mascara",  "Mascara"),
        ("Ouargla",  "Ouargla"),
        ("Oran",  "Oran"),
        ("El Bayadh",  "El Bayadh"),
        ("Illizi",  "Illizi"),
        ("Bordj Bou Arreridj",  "Bordj Bou Arreridj"),
        ("Boumerdès",  "Boumerdès"),
        ("El Tarf",  "El Tarf"),
        ("Tindouf",  "Tindouf"),
        ("Tissemsilt",  "Tissemsilt"),
        ("El Oued",  "El Oued"),
        ("Khenchela",  "Khenchela"),
        ("Souk Ahras",  "Souk Ahras"),
        ("Tipaza",  "Tipaza"),
        ("Mila",  "Mila"),
        ("Aïn Defla",  "Aïn Defla"),
        ("Naâma",  "Naâma"),
        ("Aïn Témouchent",  "Aïn Témouchent"),
        ("Ghardaïa",  "Ghardaïa"),
        ("Relizane",  "Relizane"),
        ("Timimoun",  "Timimoun"),
        ("Bordj Badji Mokhtar",  "Bordj Badji Mokhtar"),
        ("Ouled Djellal",  "Ouled Djellal"),
        ("Béni Abbès",  "Béni Abbès"),
        ("In Salah",  "In Salah"),
        ("In Guezzam",  "In Guezzam"),
        ("Touggourt",  "Touggourt"),
        ("Djanet",  "Djanet"),
        ("El Meghaier",  "El Meghaier"),
        ("El Menia",  "El Menia"),
    ]
    id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=250)
    phone = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=254)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50, choices=LOCATIONS)
    localisation = models.CharField(max_length=250)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    
    
class secretary(models.Model):
    user = models.OneToOneField(Employee, on_delete=models.CASCADE)
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE)


class blackList(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(Driver, on_delete=models.CASCADE)
    motif = models.CharField(max_length=250)
    add_date = models.DateField(("Date"), default=datetime.date.today)

@receiver(post_save, sender=blackList)
def create(sender, instance, **kwargs):
    user = User.objects.get(id=instance.user.id)
    if user.is_active == True:
        user.is_active = False
        user.save()


# quand je supprime dans lblock liste is active devienne true
# to do
'''@receiver(post_save, sender=blackList)
def delete(sender,instance, **kwargs):
      user=User.objects.get(id=instance.user_id)
      if  user.is_active==False:
          user.is_active=True
          user.save()'''
