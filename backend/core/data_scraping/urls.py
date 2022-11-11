

from django.urls import path
from .views import HomeView, TestCelery

urlpatterns = [
    path('', HomeView.as_view()),
    path('test/', TestCelery.as_view()),
]