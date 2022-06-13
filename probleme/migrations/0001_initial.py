# Generated by Django 4.0.4 on 2022-06-06 19:01

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('administration', '0001_initial'),
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Probleme',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('probeleme', models.CharField(max_length=250)),
                ('post_date', models.DateField(default=datetime.date.today, verbose_name='Date')),
                ('type', models.CharField(choices=[('mechanical', 'mechanical'), ('electrical', 'electrical'), ('suspension', 'suspension'), ('cleaning', 'cleaning'), ('body', 'body'), ('other', 'other')], max_length=50)),
                ('response', models.BooleanField(default=False)),
                ('response_date', models.DateField(null=True, verbose_name='Date')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cars.car')),
                ('garage_manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='administration.garage_manager')),
                ('locataire', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administration.driver')),
            ],
        ),
    ]