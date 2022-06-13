from fileinput import filename
from django.db import models
from secrets import choice
from numpy import deprecate
import datetime
from django.contrib.auth.models import User, Group, AbstractUser
from parcking.models import parcking
from administration.models import UserAccount
import qrcode
from fpdf import FPDF
import datetime
import pyqrcode
import png
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw
from administration.models import User


class car(models.Model):
    MODELE = [
        ('SUV', 'Sport Utility Vehicle'),
        ('Hatchback', 'Hatchback'),
        ('Crossover', 'Crossover'),
        ('Convertible', 'Convertible'),
        ('Sedan', 'Sedan'),
        ('Sports ', 'Sports '),
        ('Coupe', 'Coupe'),
        ('Minivan', 'Minivan'),
        ('Wagon', 'Station Wagon'),
        ('Pickup ', 'Pickup Truck '),
    ]
    TYPE = [
        ('car', 'car'),
        ('moto', 'motocycle'),
        ('bus', 'bus'),
    ]
    GEAR = [
        ('m', 'manual'),
        ('a', 'automatic'),
    ]
    PLACE = [
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (7, '7'),
        (12, '12'),
        (30, '30'),
    ]
    ETAT = [
        ('reserved', 'reserved'),
        ('available', 'available'),
        ('not available', 'not available'),
        ('broken', 'broken'),
        ('rented', 'rented'),
        ('new', 'new')
    ]
    MOTEUR = [
        ('e', 'essence'),
        ('d', 'diesel'),
        ('h', 'hybride'),
        ('el', 'electric'),
    ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name='Product Name')
    matricule = models.CharField(max_length=50, unique=True)
    modele = models.CharField(max_length=50, choices=MODELE)
    type = models.CharField(max_length=50, choices=TYPE)
    buy_year = models.DateField(auto_now=False, auto_now_add=False)
    gear_box = models.CharField(max_length=50, choices=GEAR)
    nb_place = models.IntegerField(choices=PLACE)
    couleur = models.CharField(max_length=50)
    etat = models.CharField(max_length=50, choices=ETAT, default='new')
    mobilité_reduite = models.BooleanField()
    moteur_type = models.CharField(max_length=50, choices=MOTEUR)
    priceH = models.IntegerField(default=0)
    priceD = models.IntegerField(default=0)
    parking = models.ForeignKey(parcking, on_delete=models.CASCADE, blank=True)
    spotLetter = models.CharField(max_length=1, blank=True)
    spotNumber = models.IntegerField(blank=True)
    photo = models.CharField(max_length=100)
    qr_code = models.ImageField(upload_to='Documents/qr_codes', blank=True)

    def __str__(self):
        return str(self.matricule)

    def save(self, *args, **kwargs):
        notExist = False
        try:
            c = car.objects.get(pk=self.id)
        except car.DoesNotExist:
            notExist = True
        if(notExist):
            qrcode_img = qrcode.make(self.matricule)
            canvas = Image.new('RGB', (290, 290), 'white')
            draw = ImageDraw.Draw(canvas)
            canvas.paste(qrcode_img)
            fname = f'qr_code-{self.matricule}'+'.png'
            buffer = BytesIO()
            canvas.save(buffer, 'PNG')
            self.qr_code.save(fname, File(buffer), save=False)
            canvas.close()
        super().save(*args, **kwargs)


class tool(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    ETAT = [
        ('reserved', 'reserved'),
        ('available', 'available'),
        ('not available', 'not available'),
        ('broken', 'broken'),
        ('rented', 'rented'),
        ('new', 'new')
    ]
    etat = models.CharField(max_length=15, choices=ETAT, default='new')
    parking = models.ForeignKey(parcking, on_delete=models.CASCADE, blank=True)


class FavoriteCar(models.Model):
    id = models.AutoField(primary_key=True)
    car = models.ManyToManyField(car)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
