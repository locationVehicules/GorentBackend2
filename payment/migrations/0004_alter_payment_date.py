# Generated by Django 4.0.4 on 2022-06-08 20:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0003_alter_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 8, 21, 6, 50, 352920)),
        ),
    ]
