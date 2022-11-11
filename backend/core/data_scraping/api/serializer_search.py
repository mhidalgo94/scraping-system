
from ..models import SearchUserModel, EbayModel, AmazonModel
from .serializer_amazon import AmazonSerializerAPI
from .serializer_ebay import EbaySerializerAPI
from rest_framework import serializers
from django.forms import model_to_dict


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchUserModel
        fields = ['id','search_title', 'mont_page', 'create_date', 'description','company', 'task_id','status_task','scheduled_date']

    
    def get_user(self, obj):
        if obj.user.staff:
            user  = model_to_dict(obj.user,fields=['user_name','email','is_active','staff', 'last_login'])
            return user
        elif obj.user.is_superuser:
            user  = model_to_dict(obj.user)
            return user
        user  = model_to_dict(obj.user, fields=['user_name','email'])
        return user


class SearchUserSerializer(serializers.ModelSerializer):
    # user = UserPublicSerializerAPI(read_only=True)
    # email = serializers.CharField(source='user.email', read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = SearchUserModel
        fields = ['id','user','search_title', 'mont_page', 'create_date', 'description','company','task_id']

    
    def get_user(self, obj):
        if obj.user.staff:
            user  = model_to_dict(obj.user,fields=['user_name','email','is_active','staff', 'last_login'])
            return user
        elif obj.user.is_superuser:
            user  = model_to_dict(obj.user)
            return user
        user  = model_to_dict(obj.user, fields=['user_name','email'])
        return user


class SearchArticlesSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    articles = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SearchUserModel
        fields = ['user','search_title', 'mont_page', 'create_date', 'description','company','favorite','articles']

    def get_articles(self,obj):
        if obj.company == 'ebay':
            qs = EbayModel.objects.filter(search_id=obj.id, delete=False)
            return EbaySerializerAPI(qs,many=True).data

        elif obj.company == 'amazon':
            qs = AmazonModel.objects.filter(search=obj.id, delete=False)
            return AmazonSerializerAPI(qs,many=True).data



    def get_user(self, obj):
        if obj.user.staff:
            user  = model_to_dict(obj.user,fields=['user_name','email','is_active', 'last_login'])
            return user
        elif obj.user.is_superuser:
            user  = model_to_dict(obj.user)
            return user
        user  = model_to_dict(obj.user, fields=['user_name','email'])
        return user