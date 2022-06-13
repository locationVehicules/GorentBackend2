from tokenize import Name
from django.db import models
from secrets import choice
from django.db import models
from numpy import deprecate
import datetime
from django.contrib.auth.models import User, Group, AbstractUser
from administration.models import *
from reservation.models import *
from parcking.models import *
from django.core.files import File
from fpdf import FPDF
import pyqrcode


class Contrat(models.Model):
    id = models.AutoField(primary_key=True)
    current_date = models.DateField(("Date"), default=datetime.date.today)
    reservation = models.ForeignKey(
        Reservation, null=False, on_delete=models.CASCADE)
    signatureDriver = models.ImageField(
        upload_to='PDFs/signatures', null=True, blank=True)
    signatureRenter = models.ImageField(upload_to='PDFs/signatures', null=True, blank=True)
    TYPES = [
        ('new', 'new'),
        ('renew', 'renew'),
    ]
    type = models.CharField(max_length=50, choices=TYPES , default='new')
    secretary_id = models.ForeignKey(
        secretary, null=True, on_delete=models.CASCADE)
    PDFFile = models.FileField(
        upload_to='PDFs/Contracts', blank=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        notExist = True
        try:
            cont = Contrat.objects.get(pk=self.id)
        except Contrat.DoesNotExist:
            notExist = False
        if(notExist):
            if(self.reservation.state == 'completed'):
                state = "Accept"
            else:
                state = "Not yet Accept"
            agency = Agency.objects.get(
                location=self.reservation.issue_location)
            agencyInfo = {
                "address": agency.address,
                "phone": agency.phone,
                "email": agency.email
            }
            if(self.secretary_id != None):
                secretary = User.objects.get(pk=self.secretary_id.user_id)
                secretaryFN = secretary.first_name
                secretaryLN = secretary.last_name
            else:
                secretaryFN = "/"
                secretaryLN = ""
            docInfo = {
                "secretary": f'{secretaryFN} {secretaryLN}',
                "renterID": self.reservation.Renter.id,
                "docID": self.id
            }
            rentedcar = self.reservation.car_rented
            if(rentedcar.gear_box == 'm'):
                typegearbox = 'Manual'
            else:
                typegearbox = 'Automatic'

            vehicleInfo = {
                "type": rentedcar.modele,
                "model": rentedcar.name,
                "regitrationNum": rentedcar.matricule,
                "color": rentedcar.couleur,
                "gearbox":  typegearbox,
                "reducedMobility": rentedcar.mobilité_reduite,
            }
            renterInfo = self.reservation.Renter
            driverInfo = self.reservation.Driver

            renter = UserAccount.objects.get(pk=renterInfo.user_id)
            if(renterInfo.type != "business"):
                renterUserInfo = User.objects.get(pk=renter.user_id)
                name = f'{renterUserInfo.first_name} {renterUserInfo.last_name}'
            else:
                renterUserInfo = Entereprise.objects.get(user_id=renterInfo.id)
                name = f'{renterUserInfo.EnterepriseName}'

            driver = UserAccount.objects.get(pk=driverInfo.user_id)
            driverUserInfo = User.objects.get(pk=driver.user_id)
            birthday = datetime.datetime.strptime(
                str(driver.birthday), '%Y-%m-%d')
            issued = datetime.datetime.strptime(
                str(driverInfo.issued), '%Y-%m-%d')
            renterInfo = {
                "renterName": name,
                "renterPhone": renter.phone,
                "renterAdrress": renter.adress,
                "driverName": f'{driverUserInfo.first_name} {driverUserInfo.last_name}',
                "driverPhone": driver.phone,
                "driverAdrress": driver.adress,
                "driverBirthday": f'{birthday.day}/{birthday.month}/{birthday.year}',
                "permitNum": driverInfo.num_license,
                "issued": f'{issued.month}/{issued.year}',
            }
            issue_date = datetime.datetime.strptime(
                str(self.reservation.issue_date), '%Y-%m-%d %H:%M:%S+00:00')
            return_date = datetime.datetime.strptime(
                str(self.reservation.return_date), '%Y-%m-%d %H:%M:%S+00:00')
            rentingInfo = {
                "dateDep": f'{issue_date.day}/{issue_date.month}/{issue_date.year} \t {issue_date.hour}:{issue_date.minute}',
                "dateRet": f'{return_date.day}/{return_date.month}/{return_date.year} \t {return_date.hour}:{return_date.minute}',
                "locationDep": self.reservation.issue_location,
                "locationRet": self.reservation.return_location
            }
            if(state == "Accept"):
                signature = {
                    "driver": cont.signatureDriver,
                    "renter": cont.signatureRenter
                }
            else:
                signature = {
                    "driver": None,
                    "renter": cont.signatureRenter
                }
            Contract_generator(state, agencyInfo, docInfo,
                               renterInfo, rentingInfo, vehicleInfo, signature)
            f = open(
                f'Documents/PDFs/Contracts/{docInfo["docID"]}_Contract.pdf', "rb")
            self.PDFFile.save(
                f'{docInfo["docID"]}_Contract.pdf', File(f), save=False)
        super().save(*args, **kwargs)


class PDF(FPDF):
    def header(self):
        # logo
        self.image("blogo.jpg",1,1,3,1)
        self.set_font('times', 'BI', 16)

        # agency name
        self.cell(18, 1, 'GoRent Vehicles Rental Agency ', ln=1, align='R')
        self.ln(.5)

    def doc_infos(self, type, agencyInfo, docInfo, state):
        # setting title style
        self.set_font('times', 'B', 16)
        # adding texts
        self.cell(0, 2, f'Rent {type}', align='C', ln=1)

        # setting Doc infos style
        self.set_font('times', '', 14)

        effective_page_width = self.w - 2*self.l_margin
        ybefore = self.get_y()

        # Agency Info
        self.multi_cell(
            effective_page_width/2, 0.75, f'GoRent \nVehicles Rental Agency \n{agencyInfo["address"]} \nPhone: {agencyInfo["phone"]} \nEmail: {agencyInfo["email"]}')
        self.set_xy(effective_page_width/2 + self.l_margin, ybefore)
        # Doc infos
        address = agencyInfo["address"][agencyInfo["address"].index(',')+1:]
        date = datetime.datetime.now()
        self.multi_cell(
            effective_page_width/2, 0.75, f' Date: {date.day}/{date.month}/{date.year} at{address} \n Secretary Name: {docInfo["secretary"]} \n Renter ID : {docInfo["renterID"]} \n {type} ID :')

        if(state == "Accept"):
            # setQRcode
            self.image(
                f'Documents/PDFs/DocQRCodes/{docInfo["docID"]}.png', x=13.5, y=6.75, w=2.5, h=2.5)

        # empty line between sections
        self.ln(1.5)

    def renter_info(self, renterInfo, type):
        # setting title style
        # adding title
        self.set_font("zapfdingbats", size=14)
        self.cell(0.5, 1, txt='\u00a9')
        self.set_font('times', 'B', 14)
        self.cell(18.5, 1, 'Renter Information:', ln=1)

        # setting info style
        self.set_font('times', '', 14)

        # renter
        self.cell(0.5)
        self.cell(4.5, 0.75, 'Renter name:')
        self.cell(14, 0.75, renterInfo["renterName"], ln=1)

        self.cell(0.5)
        self.cell(4.5, 0.75, 'Phone number:')
        self.cell(14, 0.75, renterInfo["renterPhone"], ln=1)

        self.cell(0.5)
        self.cell(4.5, 0.75, 'Adrress:')
        self.cell(14, 0.75, renterInfo["renterAdrress"], ln=1)
        if type == "Contract":
            # driver
            self.cell(0.5)
            self.cell(4.5, 0.75, 'Driver name:')
            self.cell(14, 0.75, renterInfo["driverName"], ln=1)

            self.cell(0.5)
            self.cell(4.5, 0.75, 'Phone number:')
            self.cell(14, 0.75, renterInfo["driverPhone"], ln=1)

            self.cell(0.5)
            self.cell(4.5, 0.75, 'Adrress:')
            self.cell(14, 0.75, renterInfo["driverAdrress"], ln=1)

            self.cell(0.5)
            self.cell(4.5, 0.75, 'Date of birth:')
            self.cell(14, 0.75, renterInfo["driverBirthday"], ln=1)

            self.cell(0.5)
            self.cell(2.5, 0.75, 'Permit N°')
            self.cell(5, 0.75, renterInfo["permitNum"])
            self.cell(3, 0.75, ' issued on')
            self.cell(3, 0.75, renterInfo["issued"])

        # empty line between sections
        self.ln(.5)

    def renting_info(self, rentingInfo):
        # adding title
        self.set_font("zapfdingbats", size=14)
        self.cell(0.5, 1, txt='\u00a9')
        self.set_font('times', 'B', 14)
        self.cell(18.5, 1, 'Renting Information:', ln=1)

        # renting info
        self.set_font('times', '', 14)

        #  departure info
        self.cell(0.5)
        self.cell(4, 0.75, 'Date of departure')
        self.cell(5.25, 0.75, rentingInfo["dateDep"])
        self.cell(4, 0.75, 'Departure location')
        self.cell(5.25, 0.75, rentingInfo["locationDep"], ln=1)

        # return info
        self.cell(0.5)
        self.cell(4, 0.75, 'Date of return')
        self.cell(5.25, 0.75, rentingInfo["dateRet"])
        self.cell(4, 0.75, 'Return location')
        self.cell(5.25, 0.75, rentingInfo["locationRet"], ln=1)

        # empty line between sections
        self.ln(.5)

    def vehicle_info(self, vehicleInfo):
        # adding title
        self.set_font("zapfdingbats", size=14)
        self.cell(0.5, 1, txt='\u00a9')
        self.set_font('times', 'B', 14)
        self.cell(18.5, 1, 'Vehicle Information:', ln=1)

        # vehicle info
        self.set_font('times', '', 14)
        self.cell(0.5)
        self.cell(5, 0.75, 'Type')
        self.cell(13.5, 0.75, vehicleInfo["type"], ln=1)
        self.cell(0.5)
        self.cell(5, 0.75, 'Model')
        self.cell(13.5, 0.75, vehicleInfo["model"], ln=1)
        self.cell(0.5)
        self.cell(5, 0.75, 'Registration number')
        self.cell(13.5, 0.75, vehicleInfo["regitrationNum"], ln=1)
        # vehicle features
        self.cell(0.5)
        self.cell(5, 0.75, 'Vehicle features:')
        self.cell(5, 0.75, 'Color')
        self.cell(8.5, 0.75, vehicleInfo["color"], ln=1)
        self.cell(5.5)
        self.cell(5, 0.75, 'Type of gearbox')
        self.cell(8.5, 0.75, vehicleInfo["gearbox"], ln=1)
        self.cell(5.5)
        self.cell(5, 0.75, 'Reduced mobility')
        self.cell(8.5, 0.75, f'{vehicleInfo["reducedMobility"]}')
        # empty line between sections
        self.ln(1.25)

    def bank_info(self, payment):
        self.set_font("zapfdingbats", size=14)
        self.cell(0.5, 1, txt='\u00a9')
        self.set_font('times', 'B', 14)
        self.cell(18.5, 1, 'Bank Information:', ln=1)

        self.set_font('times', '', 14)
        paymentMode = payment["mode"]

        self.cell(0.5, 0.75)
        self.cell(5, 0.75, "Payment type:")
        self.cell(4.75, 0.75, paymentMode)
        self.cell(5, 0.75, "Full payement made on:")
        self.cell(3.75, 0.75, payment["date"], ln=1)

        match paymentMode:
            case "On Ligne":
                self.cell(0.5, 0.75)
                self.cell(5, 0.75, "Bank card N°:")
                self.cell(4.75, 0.75, payment["payInfo"]["num"])
                self.cell(5, 0.75, "expires on:")
                self.cell(3.75, 0.75, payment["payInfo"]["exDate"], ln=1)

                self.cell(0.5, 0.75)
                self.cell(5, 0.75, "Bank Card name:")
                self.cell(4.75, 0.75, payment["payInfo"]["name"])
            case "On Spot": 
                self.cell(0.5, 0.75)
                self.cell(5, 0.75, "Receipt N°:")
                self.cell(13.5, 0.75, payment["payInfo"], ln=1)
        self.ln(1)

    def prices(self, products, promotion):
        self.set_font('times', 'B', 14)
        self.cell(8, 0.75, "Description", border=1, align='C')
        self.cell(3.5, 0.75, "QTY", border=1, align='C')
        self.cell(3.5, 0.75, "Unit price", border=1, align='C')
        self.cell(4, 0.75, "Amount", border=1, align='C', ln=1)

        self.set_font('times', '', 14)
        sum = 0
        for product in products:
            if(product["QTY"] != 0 and product == products[0]):
                self.cell(8, 0.65, f'{product["Description"]}', border=1)
                self.cell(
                    3.5, 0.65, f'{product["QTY"]} Day', align='C', border=1)
                self.cell(
                    3.5, 0.65, f'{product["Unit price"]}', align='C', border=1)
                self.cell(
                    4, 0.65, f'{product["Unit price"]*product["QTY"]}', align='C', border=1, ln=1)
                sum += product["Unit price"]*product["QTY"]
            elif(product["QTY"] != 0 and product == products[1]):
                self.cell(8, 0.65, f'{product["Description"]}', border=1)
                self.cell(
                    3.5, 0.65, f'{product["QTY"]} Hour', align='C', border=1)
                self.cell(
                    3.5, 0.65, f'{product["Unit price"]}', align='C', border=1)
                self.cell(
                    4, 0.65, f'{product["Unit price"]*product["QTY"]}', align='C', border=1, ln=1)
                sum += product["Unit price"]*product["QTY"]
            elif(product != products[0] and product != products[1]):
                self.cell(8, 0.65, f'{product["Description"]}', border=1)
                self.cell(3.5, 0.65, f'{product["QTY"]}', align='C', border=1)
                self.cell(
                    3.5, 0.65, f'{product["Unit price"]}', align='C', border=1)
                self.cell(
                    4, 0.65, f'{product["Unit price"]*product["QTY"]}', align='C', border=1, ln=1)
                sum += product["Unit price"]*product["QTY"]

        self.cell(0, 0.05, border=1, ln=1)
        self.cell(15, 0.65, 'Subtotal  ', border=1)
        self.cell(4, 0.65, f'{float(sum)} DZD', align='C', border=1, ln=1)
        self.cell(15, 0.65, 'Promotion  ', border=1)
        self.cell(4, 0.65, f'{promotion} %', align='C', border=1, ln=1)
        self.cell(15, 0.65, 'Total  ', border=1)
        self.cell(
            4, 0.65, f'{sum - float(sum * promotion) / 100} DZD', align='C', border=1, ln=1)
        self.ln(.5)

    def signature(self, signature, type):
        match type:
            case "Contract":
                self.cell(12.5, 1, "Renter signature", align='R')
                self.cell(1.5, 1)
                self.cell(3.5, 1, "Driver signature", align='R')
                self.cell(1, 1, ln=1)
                if(signature["renter"]):
                    self.image(f'Documents/{signature["renter"]}', x=10,
                               y=self.get_y(), w=4, h=1.5)
                if(signature["driver"]):
                    self.image(f'Documents/{signature["driver"]}', x=15,
                               y=self.get_y(), w=4, h=1.5)
            case "Bill":
                self.cell(16.5, 1, "Agency signature", align='R')
                self.cell(2.5, 1, ln=1)
                if(len(signature) != 0):
                    self.image(signature,
                               x=14, y=self.get_y(), w=4, h=1.5)

    def QRcode_generator(self, contractID):
        code = pyqrcode.create(contractID)
        code.png(f'Documents/PDFs/DocQRCodes/{contractID}.png', scale=8)


class Contract_generator():
    def __init__(self, state, agencyInfo, docInfo, renterInfo, rentingInfo, vehicleInfo, signature):
        type = "Contract"
        self.state = state
        self.agencyInfo = agencyInfo
        self.docInfo = docInfo
        self.renterInfo = renterInfo
        self.rentingInfo = rentingInfo
        self.vehicleInfo = vehicleInfo
        self.signature = signature

        # PDF settings
        # document format
        pdf = PDF('P', 'cm', 'A4')
        # adding page
        pdf.add_page()
        # QR code
        pdf.QRcode_generator(docInfo["docID"])
        pdf.doc_infos(type, agencyInfo, docInfo, state)
        pdf.renter_info(renterInfo, type)
        pdf.renting_info(rentingInfo)

        pdf.vehicle_info(vehicleInfo)
        pdf.signature(signature, "Contract")

        # get pdf file
        pdf.output(f'Documents/PDFs/Contracts/{docInfo["docID"]}_Contract.pdf')
