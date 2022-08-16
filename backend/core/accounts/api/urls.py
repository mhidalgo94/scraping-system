from django.urls import path
from .views_user import SignUpApiView, VerifyCodeAPiVew, ResendCodeVerificationAPI


urlpatterns = [
    path('sign-up/', SignUpApiView.as_view(), name="register"),
    path('verify-code/', VerifyCodeAPiVew.as_view(), name="verify-code"),
    path('resend-code/', ResendCodeVerificationAPI.as_view(), name="resend-code-verification")
]