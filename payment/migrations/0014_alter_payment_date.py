# Generated by Django 3.2.13 on 2022-06-13 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0013_alter_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateTimeField(default='2022-06-13 07:01:14+00:00'),
        ),
    ]