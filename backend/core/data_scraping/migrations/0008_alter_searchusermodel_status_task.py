# Generated by Django 3.2 on 2022-11-18 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_scraping', '0007_searchusermodel_scheduled_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='searchusermodel',
            name='status_task',
            field=models.CharField(blank=True, choices=[('SUCCESS', 'SUCCESS'), ('FAILURE', 'FAILURE'), ('REVOKED', 'REVOKED'), ('STARTED', 'STARTED'), ('RECEIVED', 'RECEIVED'), ('REJECTED', 'REJECTED'), ('RETRY', 'RETRY'), ('PENDING', 'PENDING')], default='SUCCESS', max_length=20, null=True, verbose_name='Status Task'),
        ),
    ]