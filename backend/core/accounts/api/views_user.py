import uuid
from datetime import timedelta
from django.utils import timezone
from .serializer_user import TokenObtainSerializer, ChangePasswordSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer_user import RegisterSerializer
from django.core.mail import send_mail
from core.accounts.models import User
from django.conf import settings



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
                if verify_date_token < timedelta(minutes= 5):
                    user.is_active = True
                    user.id_verify = uuid.uuid4()
                    user.save()
                    return Response({"detail":"Code verified successfully.", "code": user.id_verify  }, status= status.HTTP_200_OK)
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
            try:
                user = User.objects.get(user_name=data['username'])
                user.id_verify = uuid.uuid4()
                user.save()
                message = f'You have requested a new verification code.\nTo verify your account use this code:{user.id_verify}'
                send_mail('Forwarding of code verification.', message,settings.EMAIL_HOST_USER,[user.email])
                return Response({"detail":"A new account verification code has been sent to your email."}, status=status.HTTP_200_OK)
            except:
                return Response({"detail":"Not Found."}, status= status.HTTP_404_NOT_FOUND)

        return Response({'detail':"Not Found"}, status= status.HTTP_404_NOT_FOUND)


class VerifyUserName(APIView):


    def post(self,request, *args, **kwargs):
        data = request.data
        if 'username' in data.keys():
            try:
                user = User.objects.get(user_name=data['username'])
                user.id_verify = uuid.uuid4()
                user.save()
                message = f'You have requested a new verification code to change your password.\n Code:\t{user.id_verify}'
                send_mail('Send verification code to change password.', message, settings.EMAIL_HOST_USER,[user.email])
                return Response({'detail':'Username correct.'}, status=status.HTTP_200_OK)
            except:
                return Response({"detail":"Wrong username."}, status= status.HTTP_404_NOT_FOUND)

        return Response({'detail':'Not Found.'}, status=status.HTTP_404_NOT_FOUND)
    
class ChangePassowrdWithCode(APIView):

    def post(self,request, *args, **kwargs):
        data = request.data
        if 'code' in data.keys():
            try:
                user = User.objects.get(id_verify=data['code'], is_active=True)
                date_token = user.date_update
                verify_date_token = timezone.now() - date_token
                if verify_date_token < timedelta(minutes= 5):
                    user.id_verify = uuid.uuid4()
                    user.set_password(data['password'])
                    user.save()
                    return Response({"detail":"Password update successfully"}, status=status.HTTP_200_OK)
                return Response({"detail":"Your verification code is expired. Resend your code"}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({"detail":"Your verification code is expired. Resend your code"}, status= status.HTTP_401_UNAUTHORIZED)

        return Response({'detail':'Not Found.'}, status=status.HTTP_404_NOT_FOUND)