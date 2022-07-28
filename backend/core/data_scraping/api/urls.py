
from django.urls import path
from .views_amazon import AmazonListAPI, AmazonDestroyAPI, AmazonUpdateAPI
from .views_ebay import EbayListAPI, EbayDestroyAPI, EbayUpdateAPI
from .views_search import SearchUserDestroyAPI, SearchUserListAPI, SearchUserUpdateAPI
from .views_log import LogRequestListAPI, LogRequestDestroyAPI, LogRequestUpdateAPI

from rest_framework_simplejwt.views import TokenRefreshView
from core.accounts.api.views_user import TokenObtainViewAPI

urlpatterns =[
    path('list/amazon/', AmazonListAPI.as_view(), name='amazon-list'),
    path('amazon/<int:id>/update/', AmazonUpdateAPI.as_view(), name='amazon-update'),
    path('amazon/<int:id>/delete/', AmazonDestroyAPI.as_view(), name='amazon-delete'),
    path('list/ebay/', EbayListAPI.as_view(), name='ebay-list'),
    path('ebay/<int:id>/update/', EbayUpdateAPI.as_view(), name='ebay-update'),
    path('ebay/<int:id>/delete/', EbayDestroyAPI.as_view(), name='ebay-delete'),
    path('list/search/', SearchUserListAPI.as_view(), name='search-user'),
    path('search/<int:id>/update/', SearchUserUpdateAPI.as_view(), name='search-user-update'),
    path('search/<int:pk>/delete/', SearchUserDestroyAPI.as_view(), name='search-user-delete'),
    path('search/logs/', LogRequestListAPI.as_view(), name='log-search'),
    path('search/logs/<int:id>/update/', LogRequestUpdateAPI.as_view(), name='log-search-update'),
    path('search/logs/<int:id>/delete/', LogRequestDestroyAPI.as_view(), name='log-search-delete'),
    path('login/', TokenObtainViewAPI.as_view(), name='token_obtain_pair'),
    path('refresh/token/', TokenRefreshView.as_view(), name='token_refresh'),
]