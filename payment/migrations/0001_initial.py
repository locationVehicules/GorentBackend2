# Generated by Django 4.0.4 on 2022-06-06 19:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('method_paiment', models.CharField(choices=[('On Ligne', 'On Ligne'), ('On Spot', 'On Spot')], max_length=10)),
                ('Receipt', models.IntegerField(null=True, unique=True)),
                ('date', models.DateTimeField(default=datetime.datetime(2022, 6, 6, 20, 1, 37, 199830))),
                ('cardNum', models.CharField(max_length=20, null=True)),
                ('exDate', models.DateField(null=True)),
                ('cardName', models.CharField(max_length=25, null=True)),
                ('Amount', models.FloatField(default=0)),
                ('nbHour', models.IntegerField(default=0)),
                ('nbDay', models.IntegerField(default=0)),
            ],
        ),
    ]