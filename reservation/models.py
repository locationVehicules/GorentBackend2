from ast import Constant
from xml.sax.xmlreader import Locator
from django.db import models
from administration.models import *
from cars.models import car, tool


class Reservation(models.Model):
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
    STATUS = [
        ('not payed', 'not payed'),
        ('not completed', 'not completed'),
        ('driver not yet signed', 'driver not yet signed'),
        ('completed', 'completed'),
        ('active', 'active'),
        ('expired', 'expired'),
    ]
    id = models.AutoField(primary_key=True)
    issue_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    return_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    issue_location = models.CharField(max_length=50, choices=LOCATIONS)
    return_location = models.CharField(max_length=50, choices=LOCATIONS)
    car_rented = models.ForeignKey(car, on_delete=models.CASCADE)
    tool_rented = models.ManyToManyField(tool, blank=True)
    sort_checker = models.ForeignKey(
        garage_manager, null=True, related_name='sort_checker', on_delete=models.CASCADE)
    enter_checker = models.ForeignKey(
        garage_manager, null=True, related_name='enter_checker', on_delete=models.CASCADE)
    Driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    Renter = models.ForeignKey(Renter, on_delete=models.CASCADE)
    state = models.CharField(max_length=25, choices=STATUS)

#     amount = models.IntegerField(verbose_name='Amount')
#     stripe_payment_intent = models.CharField(max_length=200)
#     has_paid = models.BooleanField(default=False, verbose_name='Payment Status')
