from .serializer_search import SearchUserSerializer
from rest_framework.generics import ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import permissions as permss
from rest_framework.response import Response
from rest_framework import status


class SearchUserListAPI(ListAPIView):
    queryset = SearchUserSerializer.Meta.model.objects.all()
    serializer_class = SearchUserSerializer
    permission_classes = [permss.IsAuthenticated]

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs


class SearchUserUpdateAPI(UpdateAPIView):
    serializer_class = SearchUserSerializer
    permission_classes = [permss.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs


class SearchUserDestroyAPI(DestroyAPIView):
    serializer_class = SearchUserSerializer
    permission_classes = [permss.IsAuthenticated]

    # lookup_field = 'id'


    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs

    def delete(self,request, pk):
        qs_delete = self.get_queryset().get(id=pk)
        if(qs_delete):
            qs_delete.delete = True
            qs_delete.save()
            return Response({"Detail":"Delete complete"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"Detail":"Not Found"}, status=status.HTTP_404_NOT_FOUND)

