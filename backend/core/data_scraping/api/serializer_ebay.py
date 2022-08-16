from rest_framework import serializers
from core.data_scraping.models import  EbayModel

class EbaySerializerAPI(serializers.ModelSerializer):


    class Meta:
        model = EbayModel
        fields = ['id','search','page','product', 'img','url_product','rate','price','old_price','favorite','create_date','get_save']


