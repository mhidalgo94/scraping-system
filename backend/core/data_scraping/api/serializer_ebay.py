from rest_framework import serializers
from core.data_scraping.models import  EbayModel

class EbaySerializerAPI(serializers.ModelSerializer):


    class Meta:
        model = EbayModel
        exclude = ['id', 'date_update', 'delete']
