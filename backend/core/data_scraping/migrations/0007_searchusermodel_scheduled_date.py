# Generated by Django 3.2 on 2022-11-11 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_scraping', '0006_searchusermodel_status_task'),
    ]

    operations = [
        migrations.AddField(
            model_name='searchusermodel',
            name='scheduled_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Date scheduled'),
        ),
    ]
