from rest_framework.generics import ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializer_amazon import AmazonSerializerAPI
from rest_framework.response import Response
from rest_framework import status

class AmazonListAPI(ListAPIView):
    queryset = AmazonSerializerAPI.Meta.model.objects.filter(delete=False).order_by('-id')[:100]
    serializer_class  = AmazonSerializerAPI
    permission_classes = [IsAuthenticated]


    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs




class AmazonUpdateAPI(UpdateAPIView):
    serializer_class = AmazonSerializerAPI
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs


class AmazonDestroyAPI(DestroyAPIView):
    serializer_class = AmazonSerializerAPI
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
    