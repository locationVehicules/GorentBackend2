# Generated by Django 3.2.13 on 2022-06-11 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0011_alter_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateTimeField(default='2022-06-11 22:29:07+00:00'),
        ),
    ]
