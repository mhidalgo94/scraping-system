from ..models import SearchUserModel
from rest_framework import serializers
from django.forms import model_to_dict


class SearchUserSerializer(serializers.ModelSerializer):
    # user = UserPublicSerializerAPI(read_only=True)
    # email = serializers.CharField(source='user.email', read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = SearchUserModel
        fields = ['id','user','search_title', 'mont_page', 'create_date', 'description','company']

    
    def get_user(self, obj):
        if obj.user.staff:
            user  = model_to_dict(obj.user,fields=['user_name','email','is_active','staff', 'last_login'])
            return user
        elif obj.user.is_superuser:
            user  = model_to_dict(obj.user)
            return user
        user  = model_to_dict(obj.user, fields=['user_name','email'])
        return user