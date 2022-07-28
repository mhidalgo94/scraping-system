from rest_framework.generics import ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializer_ebay import EbaySerializerAPI
from rest_framework.response import Response
from rest_framework import status

class EbayListAPI(ListAPIView):
    queryset = EbaySerializerAPI.Meta.model.objects.filter(delete=False)
    serializer_class  = EbaySerializerAPI
    permission_classes = [IsAuthenticated]

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs



class EbayUpdateAPI(UpdateAPIView):
    serializer_class = EbaySerializerAPI
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self,*args, **kwargs):
        obj = self.serializer_class.Meta.model
        qs = obj.objects.filter(delete=False,user=self.request.user)
        return qs


class EbayDestroyAPI(DestroyAPIView):
    serializer_class = EbaySerializerAPI
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
    