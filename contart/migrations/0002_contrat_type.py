# Generated by Django 4.0.4 on 2022-06-08 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contrat',
            name='type',
            field=models.CharField(choices=[('new', 'new'), ('renew', 'renew')], default='new', max_length=50),
            preserve_default=False,
        ),
    ]
