from rest_framework import serializers
from core.data_scraping.models import WalmartModel



class WalmartSerializerAPI(serializers.ModelSerializer):


    class Meta:
        model = WalmartModel
        exclude = ['date_update','delete']

