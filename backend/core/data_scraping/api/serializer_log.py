# Serializer only for search and log requests
from rest_framework import serializers
from core.accounts.api.serializer_user import UserPublicSerializerAPI
from core.data_scraping.models import LogRequestModel
from core.data_scraping.models import SearchUserModel




class LogRelatedSearchSerializer(serializers.ModelSerializer):
    user = UserPublicSerializerAPI(read_only=True)

    class Meta:
        model = SearchUserModel
        fields = ['user','search_title', 'mont_page', 'create_date', 'description','company']

class LogRequestSerializer(serializers.ModelSerializer):
    search_request = LogRelatedSearchSerializer(read_only=True)

    class Meta:
        model = LogRequestModel
        fields = ['id','search_request', 'status_code_request','page','url_page','date_request']


