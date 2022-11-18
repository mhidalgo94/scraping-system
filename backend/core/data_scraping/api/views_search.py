from .serializer_search import SearchUserSerializer, SearchArticlesSerializer
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import permissions as permss
from rest_framework.response import Response
from rest_framework import status


class SearchUserListAPI(ListAPIView):
    queryset = SearchUserSerializer.Meta.model.objects.all()
    serializer_class = SearchUserSerializer
    permission_classes = [permss.IsAuthenticated]

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user, status_task='SUCCESS').order_by('-id')
        return qs


class SearchUserUpdateAPI(UpdateAPIView):
    serializer_class = SearchUserSerializer
    permission_classes = [permss.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs


class SearchUserDestroyAPI(APIView):
    serializer_class = SearchUserSerializer
    permission_classes = [permss.IsAuthenticated]
    lookup_field = 'id'



    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs

    def delete(self,request, id):
        query_delete = self.get_queryset().get(id=id)
        if query_delete.delete is False:
            query_delete.delete = True
            query_delete.save()
            # 
            return Response({"Detail":"Delete complete"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"Detail":"Not Found"}, status=status.HTTP_404_NOT_FOUND)




class ArticlesBySearchRetrieveAPI(RetrieveAPIView):
    serializer_class = SearchArticlesSerializer
    permission_classes = [permss.IsAuthenticated]
    lookup_field = 'id'


    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs
