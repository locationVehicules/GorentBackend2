from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth.admin import UserAdmin
from administration.models import secretary
from contart.models import *
from parcking.models import *
from reservation.models import Reservation
from payment.models import Payment
import datetime


class Bill(models.Model):
    id = models.AutoField(primary_key=True)
    current_date = models.DateField(("Date"), default=datetime.date.today)
    Contrat = models.ForeignKey(Contrat, on_delete=models.CASCADE)
    promotion = models.IntegerField(null=True, default=0)
    PDFBill = models.FileField(upload_to='PDFs/Bills', blank=True)
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, blank=True, null=True)

    def save(self, *args, **kwargs):
        notExist = True
        try:
            bill = Bill.objects.get(pk=self.id)
        except Bill.DoesNotExist:
            notExist = False
        if(notExist):
            reservation = Reservation.objects.get(
                pk=self.Contrat.reservation_id)
            if(reservation.state == 'not completed'):
                state = "Accept"
            else:
                state = "Not yet Accept"
            agency = Agency.objects.get(location=reservation.issue_location)
            agencyInfo = {
                "address": agency.address,
                "phone": agency.phone,
                "email": agency.email
            }
            if(self.Contrat.secretary_id != None):
                secretary = User.objects.get(
                    pk=self.Contrat.secretary_id.user_id)
                secretaryFN = secretary.first_name
                secretaryLN = secretary.last_name
            else:
                secretaryFN = "/"
                secretaryLN = ""
            docInfo = {
                "secretary": f'{secretaryFN} {secretaryLN}',
                "renterID":  reservation.Renter.id,
                "docID": self.id
            }

            renterInfo = reservation.Renter
            driverInfo = reservation.Driver

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
                str(reservation.issue_date), '%Y-%m-%d %H:%M:%S+00:00')
            return_date = datetime.datetime.strptime(
                str(reservation.return_date), '%Y-%m-%d %H:%M:%S+00:00')
            rentingInfo = {
                "dateDep": f'{issue_date.day}/{issue_date.month}/{issue_date.year} \t {issue_date.hour}:{issue_date.minute}',
                "dateRet": f'{return_date.day}/{return_date.month}/{return_date.year} \t {return_date.hour}:{return_date.minute}',
                "locationDep": reservation.issue_location,
                "locationRet": reservation.return_location
            }
            rentedCar = car.objects.get(pk=reservation.car_rented.id)
            products = [
                {
                    "Description": rentedCar.name,
                    "QTY": self.payment.nbDay,
                    "Unit price": rentedCar.priceD
                },
                {
                    "Description": rentedCar.name,
                    "QTY": self.payment.nbHour,
                    "Unit price": rentedCar.priceH
                }
            ]
            # tools = ReservationTool.objects.filter(reservation=reservation.id)
            tools = reservation.tool_rented.all()
            for t in tools:
                products.append(
                    {
                        "Description": t.name,
                        "QTY": 1,
                        "Unit price": t.price
                    }
                )
            date = datetime.datetime.strptime(
                str(self.payment.date), '%Y-%m-%d %H:%M:%S+00:00')
            if(self.payment.Receipt):
                receipt = f'{self.payment.Receipt}'
            else:
                receipt = ""
            match self.payment.method_paiment:
                case "On Ligne":
                    exDate = datetime.datetime.strptime(
                        str(self.payment.exDate), '%Y-%m-%d')
                    payment = {
                        "mode": self.payment.method_paiment,
                        "date": f'{date.day}/{date.month}/{date.year} \t {date.hour}:{date.minute}',
                        "payInfo": {
                            "num": self.payment.cardNum,
                            "exDate": f'{exDate.month}/{exDate.year}',
                            "name": self.payment.cardName
                        }}
                case "On Spot":
                    payment = {
                        "mode": self.payment.method_paiment,
                        "date": f'{date.day}/{date.month}/{date.year} \t {date.hour}:{date.minute}',
                        "payInfo": receipt
                    }

            signatureA = "Documents/PDFs/signatures/goRentSign.png"
            Bill_generator(state, agencyInfo, docInfo, renterInfo, rentingInfo,
                           products, self.promotion, payment, signatureA)
            f = open(
                f'Documents/PDFs/Bills/{docInfo["docID"]}_Bill.pdf', "rb")
            self.PDFBill.save(
                f'{docInfo["docID"]}_Bill.pdf', File(f), save=False)
        super().save(*args, **kwargs)


class Bill_generator():
    def __init__(self, state, agencyInfo, docInfo, renterInfo, rentingInfo, products, promotion, payment, signature):
        type = "Bill"
        self.state = state
        self.agencyInfo = agencyInfo
        self.docInfo = docInfo
        self.renterInfo = renterInfo
        self.rentingInfo = rentingInfo
        self.products = products
        self.promotion = promotion
        self.payment = payment
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

        pdf.bank_info(payment)
        pdf.prices(products, promotion)
        pdf.signature(signature, type)

        # get pdf file
        pdf.output(f'Documents/PDFs/Bills/{docInfo["docID"]}_{type}.pdf')
