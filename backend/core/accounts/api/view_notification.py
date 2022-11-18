from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from ..models import NotificationModel
from core.data_scraping.api.serializer_search import SearchUserSerializer


# Serializador notifications
class NotificationSerializer(serializers.ModelSerializer):
    search = serializers.SerializerMethodField(read_only=True)

    def get_search(self,obj):
        return SearchUserSerializer(obj.search).data


    class Meta:
        model = NotificationModel
        fields = '__all__'

# APIView notifications
class NotificationListAPIView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        notification = NotificationModel.objects.filter(search__user=user).order_by('-id')
        return notification
        
class NotificationsAllCheckedAPIView(APIView):
    permission_classes = [IsAuthenticated]

    
    def get(self,request, *args, **kwargs):
        user = request.user
        notification = NotificationModel.objects.filter(search__user=user,read=False)
        for m in notification:
            m.read = True
            m.save()

        notification = NotificationModel.objects.filter(search__user=user)
        serializer = NotificationSerializer(notification, many=True)
        return Response({'results':serializer.data}, status=status.HTTP_200_OK)

class NotificationUpdateAPIView(UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'