from rest_framework import serializers
from django.conf import settings
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
        if user.img:
            token['image'] = f'{settings.MEDIA_URL}{str(user.img)}'
        token['mang'] = user.is_admin
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
        fields = ['firstname','lastname','email','user_name','is_active', 'is_staff','is_superuser','last_login','img']




class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['user_name', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, max_length=128,write_only=True)

    class Meta:
        model = User
        fields = ['firstname', 'lastname','user_name', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs


    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

class UserRetrieViewSerializerAPI(serializers.ModelSerializer):
    firstname = serializers.CharField(required=False)
    lastname = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    user_name = serializers.CharField(required=False)
    staff = serializers.BooleanField(required=False)
    is_active = serializers.BooleanField(required=False)
    img = serializers.ImageField(required=False)
    password = serializers.CharField(write_only=True, required=False)
    last_login = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    date_update = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)


    class Meta:
        model = User
        fields = ['firstname','lastname','email','user_name', 'password','is_active','staff','img', 'last_login', 'date_update']

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
            user.save()
        return user