from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializer_log import LogRequestSerializer


class LogRequestListAPI(ListAPIView):
    queryset = LogRequestSerializer.Meta.model.objects.all()
    serializer_class = LogRequestSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search_request__user=self.request.user)
        return qs



class LogRequestUpdateAPI(UpdateAPIView):
    serializer_class = LogRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs


class LogRequestDestroyAPI(DestroyAPIView):
    serializer_class = LogRequestSerializer
    permission_classes = [IsAuthenticated]
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
    


class LogRequestSearchRetrieveAPI(RetrieveAPIView):
    queryset = LogRequestSerializer.Meta.model.objects.all()
    serializer_class = LogRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,search_request__user=self.request.user)
        return qs


    def get(self, request, *args, **kwargs):
        id_ = kwargs['id']
        query = self.get_queryset().filter(search_request=id_)

        page = self.paginate_queryset(query)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response({"detail":"No found"}, status=status.HTTP_404_NOT_FOUND)



    
