# Generated by Django 3.2.13 on 2022-06-13 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0012_alter_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateTimeField(default='2022-06-13 06:54:47+00:00'),
        ),
    ]
