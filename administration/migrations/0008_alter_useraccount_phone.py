# Generated by Django 3.2.13 on 2022-06-12 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0007_remove_useraccount_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='phone',
            field=models.CharField(default='none', max_length=50, unique=True),
        ),
    ]
