# Generated by Django 3.2 on 2022-07-11 03:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data_scraping', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logrequestmodel',
            name='search_request',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_scraping.searchusermodel', verbose_name=' search request'),
        ),
    ]
