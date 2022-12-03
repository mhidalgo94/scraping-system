from rest_framework import serializers
from core.data_scraping.models import MacysModel



class MacysSerializerAPI(serializers.ModelSerializer):


    class Meta:
        model = MacysModel
        exclude = ['date_update','delete']

