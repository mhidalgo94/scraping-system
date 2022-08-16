from rest_framework import serializers
from core.data_scraping.models import AmazonModel



class AmazonSerializerAPI(serializers.ModelSerializer):


    class Meta:
        model = AmazonModel
        exclude = ['date_update','delete']

