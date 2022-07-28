from .serializer_user import TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class TokenObtainViewAPI(TokenObtainPairView):
    serializer_class = TokenObtainSerializer


