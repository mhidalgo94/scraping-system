from rest_framework import serializers
from core.data_scraping.models import EtsyModel



class EtsySerializerAPI(serializers.ModelSerializer):


    class Meta:
        model = EtsyModel
        exclude = ['date_update','delete']

