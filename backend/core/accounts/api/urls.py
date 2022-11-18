from django.urls import path
from .views_user import (
    SignUpApiView, VerifyCodeAPiVew, 
    ResendCodeVerificationAPI, VerifyUserName, 
    ChangePassowrdWithCode,UserListAPIView,
    UserRetrieveAPIView,
    UserUpdateAPIView,UserDestroyEverAPIView
)
from .view_notification import NotificationListAPIView,NotificationsAllCheckedAPIView, NotificationUpdateAPIView


urlpatterns = [
    path('sign-up/', SignUpApiView.as_view(), name="register"),
    path('verify-code/', VerifyCodeAPiVew.as_view(), name="verify-code"),
    path('resend-code/', ResendCodeVerificationAPI.as_view(), name="resend-code-verification"),
    path('verify-username/', VerifyUserName.as_view(), name="verify-username"),
    path('change-password/', ChangePassowrdWithCode.as_view(), name="change-password"),
    path('list/', UserListAPIView.as_view(), name='user-list'),
    path('<str:user_name>/retrieve/',UserRetrieveAPIView.as_view(), name="user-retrieve"),
    path('<str:user_name>/update/',UserUpdateAPIView.as_view(), name="user-update"),
    path('<str:user_name>/destroy/', UserDestroyEverAPIView.as_view(), name='user-destroy'),
    # Notifications 
    path('notification/list/', NotificationListAPIView.as_view(),name='user-notification'),
    path('notification/all-checked/', NotificationsAllCheckedAPIView.as_view(),name='checked-all-notifications'),
    path('notification/<int:id>/update/', NotificationUpdateAPIView.as_view(),name='update-notifications'),
]