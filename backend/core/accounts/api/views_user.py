import uuid
from datetime import timedelta
from django.utils import timezone
from .serializer_user import TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer_user import RegisterSerializer
from django.core.mail import send_mail
from core.accounts.models import User



class TokenObtainViewAPI(TokenObtainPairView):
    serializer_class = TokenObtainSerializer


class SignUpApiView(CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self,request):
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({"user":user_serializer.data,"detail":"user created successfully"},status=status.HTTP_201_CREATED)
        return Response({'detail':user_serializer.errors},status = status.HTTP_400_BAD_REQUEST)


class VerifyCodeAPiVew(APIView):

    def post(self,request, *args ,**kwargs):
        data = request.data
        if 'code' in data.keys() and 'username' in data.keys():
            try:
                user = User.objects.get(user_name=data['username'],id_verify=data['code'])
                date_token = user.date_update
                verify_date_token = timezone.now() - date_token
                if verify_date_token < timedelta(minutes= 1):
                    user.is_active = True
                    user.id_verify = uuid.uuid4()
                    user.save()
                    return Response({"detail":"Code verified satisfactorily."}, status= status.HTTP_200_OK)
                else:
                    return Response({"detail":"Time code verification expired."}, status= status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({"detail":"Code validation invalid."}, status= status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'detail':"Not found."}, status= status.HTTP_404_NOT_FOUND)

class ResendCodeVerificationAPI(APIView):

    def post(self, request, *args, **kwags):
        data = request.data
        if 'username' in data.keys():
            print(data['username'])
            try:
                user = User.objects.get(user_name=data['username'])
                user.id_verify = uuid.uuid4()
                user.save()
                message = f'You have requested a new verification code.\nTo verify your account use this code:{user.id_verify}'
                send_mail('Forwarding of code virification.', message,'marito.hidalgo94@gmail.com',[user.email])
            except:
                return Response({"detail":"Not Found."}, status= status.HTTP_404_NOT_FOUND)

        return Response({'detail':"Not Found"}, status= status.HTTP_404_NOT_FOUND)

    