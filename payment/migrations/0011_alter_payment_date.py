# Generated by Django 4.0.4 on 2022-06-11 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0010_alter_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateTimeField(default='2022-06-11 11:30:01+00:00'),
        ),
    ]