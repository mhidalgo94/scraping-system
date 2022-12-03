from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializer_walmart import WalmartSerializerAPI
from rest_framework.response import Response
from rest_framework import status

class WalmartListAPI(ListAPIView):
    serializer_class  = WalmartSerializerAPI
    permission_classes = [IsAuthenticated]

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search__user=self.request.user)
        return qs



class WalmartUpdateAPI(UpdateAPIView):
    serializer_class = WalmartSerializerAPI
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search__user=self.request.user)
        return qs


class WalmartDestroyAPI(APIView):
    serializer_class = WalmartSerializerAPI
    permission_classes = [IsAuthenticated]
    # lookup_field = 'id'


    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search__user=self.request.user)
        return qs
        
    def delete(self,request, id):
        qs_delete = self.get_queryset().get(id=id)
        if qs_delete.delete is False:
            qs_delete.delete = True
            qs_delete.save()
            return Response({"Detail":"Delete complete"}, status=status.HTTP_204_NO_CONTENT)
        elif qs_delete.delete:
            qs_delete.delete()
            return Response({"Detail":"Delete complete"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"Detail":"Not Found"}, status=status.HTTP_404_NOT_FOUND)
    


class WalmartListSearchAPI(ListAPIView):
    serializer_class  = WalmartSerializerAPI
    permission_classes = [IsAuthenticated]

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search__user=self.request.user)
        return qs

    def list(self, request, *args, **kwargs):
        query =self.get_queryset().filter(search=kwargs['id'])
        page = self.paginate_queryset(query)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(query, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class WalmartListSearchFavoriteAPI(ListAPIView):
    serializer_class  = WalmartSerializerAPI
    permission_classes = [IsAuthenticated]

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search__user=self.request.user,favorite=True)
        return qs

    def list(self, request, *args, **kwargs):
        query =self.get_queryset().filter(search=kwargs['id'])
        page = self.paginate_queryset(query)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(query, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
