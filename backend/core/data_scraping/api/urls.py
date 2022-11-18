
from django.urls import path
from .views_amazon import AmazonListAPI, AmazonDestroyAPI, AmazonUpdateAPI, AmazonListSearchAPI,AmazonListSearchFavoriteAPI
from .views_ebay import EbayListAPI, EbayDestroyAPI, EbayUpdateAPI,EbayListSearchAPI, EbayListSearchFavoriteAPI
from .views_search import SearchUserDestroyAPI, SearchUserListAPI, SearchUserUpdateAPI, ArticlesBySearchRetrieveAPI
from .views_log import LogRequestListAPI, LogRequestDestroyAPI, LogRequestUpdateAPI, LogRequestSearchRetrieveAPI
from .start_scraping_view import ScrapingApiView,ScheduleScrapingApiView, RevokeTaskApiView,TaskScheduledPendingApiView

from rest_framework_simplejwt.views import TokenRefreshView
from core.accounts.api.views_user import TokenObtainViewAPI



urlpatterns =[
    # Start Scraping Web 
    path('search/', ScrapingApiView.as_view(), name='start-scraping'),
    path('search-schedule/', ScheduleScrapingApiView.as_view(), name='start-schedule-scraping'),
    path('revoke-task/', RevokeTaskApiView.as_view(), name='revoke-scheduled-task'),
    path('scheduled-task-list/', TaskScheduledPendingApiView.as_view(), name='scheduled-task-user'),
    # Model Amazon API
    path('list/amazon/', AmazonListAPI.as_view(), name='amazon-list'),
    path('list/amazon/search/<int:id>/', AmazonListSearchAPI.as_view(), name='amazon-list-search'),
    path('list/amazon/search/<int:id>/favorites/', AmazonListSearchFavoriteAPI.as_view(), name='amazon-list-search-favorite'),
    path('amazon/<int:id>/update/', AmazonUpdateAPI.as_view(), name='amazon-update'),
    path('amazon/<int:id>/delete/', AmazonDestroyAPI.as_view(), name='amazon-delete'),

    # Model Ebay API
    path('list/ebay/', EbayListAPI.as_view(), name='ebay-list'),
    path('list/ebay/search/<int:id>/', EbayListSearchAPI.as_view(), name='ebay-list-search'),
    path('list/ebay/search/<int:id>/favorites/', EbayListSearchFavoriteAPI.as_view(), name='ebay-list-search-favorite'),
    path('ebay/<int:id>/update/', EbayUpdateAPI.as_view(), name='ebay-update'),
    path('ebay/<int:id>/delete/', EbayDestroyAPI.as_view(), name='ebay-delete'),
    # Model Search API
    path('list/search/', SearchUserListAPI.as_view(), name='search-user'),
    path('search/<int:id>/update/', SearchUserUpdateAPI.as_view(), name='search-user-update'),
    path('search/<int:id>/delete/', SearchUserDestroyAPI.as_view(), name='search-user-delete'),
    path('list/articles/<int:id>/', ArticlesBySearchRetrieveAPI.as_view(), name='list-articles'), # List the Articles but need id search
    path('search/logs/', LogRequestListAPI.as_view(), name='log-search'),
    path('search/logs/<int:id>/', LogRequestSearchRetrieveAPI.as_view(), name='log-search-retrieve'),
    path('search/logs/<int:id>/update/', LogRequestUpdateAPI.as_view(), name='log-search-update'),
    path('search/logs/<int:id>/delete/', LogRequestDestroyAPI.as_view(), name='log-search-delete'),

    # Endpoint for login and refresh token
    path('login/', TokenObtainViewAPI.as_view(), name='token_obtain_pair'),
    path('refresh/token/', TokenRefreshView.as_view(), name='token_refresh'),
]