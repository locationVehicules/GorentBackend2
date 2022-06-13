import stripe
from .models import *
from django.conf import settings
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import *
# Create your views here.


@api_view(['POST'])
def Pay(request):
    if request.method == 'POST':
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            key = stripe.PaymentIntent.create(
                amount=request.data.get('aumount') * 100,
                currency="DZD",
                payment_method_types=["card"],
            )
            r = stripe.PaymentIntent.confirm(
                key.id, payment_method="pm_card_visa",)
            return Response(status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e))


@api_view(['POST'])
def AddPayment(request):
    if request.method == 'POST':
        serializer = PaymentSerializers(data=request.data)
        if serializer .is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['PUT'])
def UpdatePayment(request, pk):
    if request.method == 'PUT':
        payment = Payment.objects.get(id=pk)
        serializer = PaymentSerializers(instance=payment, data=request.data)

        if serializer .is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
