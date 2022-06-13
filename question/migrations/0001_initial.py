# Generated by Django 4.0.4 on 2022-06-06 19:01

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('administration', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=250)),
                ('response', models.CharField(max_length=250, null=True)),
                ('post_date', models.DateField(default=datetime.date.today, verbose_name='Date')),
                ('response_date', models.DateField(null=True, verbose_name='Date')),
                ('Renter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administration.renter')),
                ('admin', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='administration.useraccount')),
            ],
        ),
    ]