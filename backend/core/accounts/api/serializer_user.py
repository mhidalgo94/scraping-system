from rest_framework import serializers
from ..models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializador para el token JWT
class TokenObtainSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)

        token['user_name'] = user.user_name
        token['firstname'] = user.firstname
        token['lastname'] = user.lastname
        return token



class UserSearchSerializerInLine(serializers.Serializer):
    search_title = serializers.CharField(read_only=True)
    mont_page = serializers.IntegerField(read_only=True)
    create_date = serializers.DateTimeField(read_only=True)
    description = serializers.CharField(read_only=True)



class UserPublicSerializerAPI(serializers.ModelSerializer):
    # user_name = serializers.CharField(read_only=True)
    # email = serializers.EmailField(read_only=True)
    # is_active = serializers.BooleanField(read_only=True)
    # admin = serializers.BooleanField(read_only=True)
    # staff = serializers.BooleanField(read_only=True)
    # other_search = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['firstname','lastname','email','user_name']

    # def get_other_search(self,obj):
    #     user = obj
    #     my_search_qs = user.searchusermodel_set.all()
    #     return UserSearchSerializerInLine(my_search_qs, many=True).data


class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = User
        fields = ['firstname','lastname','email','username','is_active', 'is_staff','is_superuser']


class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['user_name', 'email']