# Generated by Django 3.2 on 2022-07-11 03:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SearchUserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('search_title', models.CharField(max_length=255, verbose_name='search title')),
                ('mont_page', models.PositiveSmallIntegerField(default=1, verbose_name='mont page')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='date create')),
                ('create_update', models.DateTimeField(auto_now=True, verbose_name='date update')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Search',
                'verbose_name_plural': 'Searchs',
                'db_table': 'Search',
            },
        ),
        migrations.CreateModel(
            name='LogRequestModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_code_request', models.PositiveSmallIntegerField(verbose_name='status code')),
                ('date_request', models.DateTimeField(verbose_name='date request')),
                ('create_date_log', models.DateTimeField(auto_now_add=True, verbose_name='date create log')),
                ('search_request', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='data_scraping.searchusermodel', verbose_name=' search request')),
            ],
            options={
                'verbose_name': 'log request',
                'verbose_name_plural': 'logs requests',
                'db_table': 'Log Request',
            },
        ),
        migrations.CreateModel(
            name='AmazonModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page', models.PositiveSmallIntegerField(default=1, verbose_name='page')),
                ('product', models.CharField(max_length=255, verbose_name='product name')),
                ('img', models.URLField(verbose_name='URL image')),
                ('url_product', models.URLField(verbose_name='URL article')),
                ('rate', models.CharField(blank=True, max_length=20, null=True, verbose_name='rate')),
                ('price', models.FloatField(verbose_name='price')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='date create')),
                ('create_update', models.DateTimeField(auto_now=True, verbose_name='date update')),
                ('search', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='data_scraping.searchusermodel')),
            ],
            options={
                'verbose_name': 'amazon',
                'verbose_name_plural': 'amazon',
                'db_table': 'Data Amazon',
            },
        ),
    ]