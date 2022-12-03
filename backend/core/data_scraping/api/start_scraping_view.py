import pytz
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer_search import SearchSerializer
from core.data_scraping.models import SearchUserModel
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from core.script.ebay_store import ejecut_scraping_Ebay
from core.script.amazon_store import ejecut_scraping_Amazon
from core.script.walmart_store import ejecut_scraping_Walmart
from core.script.etsy_store import ejecut_scraping_Etsy
from core.script.macys_store import ejecut_scraping_Macys
from core.data_scraping.task import schedule_scraping_task
from celery.result import AsyncResult


def manual_validation_values(data_request):
    search = data_request['search_title']
    desc = data_request['description']
    company = data_request['company']
    pages = int(data_request['mount_page'])
    date_search = data_request.get('dateSearch',None)
    try:
        assert len(search) > 0 , "The 'title' parameter is required."
        assert len(desc) > 0 , "The 'description' parameter is required."
        assert company.lower() in  settings.COMPANY_TO_SCRAPING, "This company no register in system."
        assert pages in range(1,11), "Parameter 'pages' is not in the required range."
        if date_search != None:
            assert len(date_search) > 0, "The parameter 'date schedule' has to be datetime -> YYYY-mm-ddTHH:MM."
        return (True,'')
    except AssertionError as msg:
        return (False,str(msg))


class ScrapingApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request, *args, **kwargs):
        user = request.user
        data_request = request.data
        validation = manual_validation_values(data_request)
        if validation[0] is False:
                return Response({"detail":validation[1]}, status=status.HTTP_400_BAD_REQUEST)

        search = SearchUserModel.objects.create(
            search_title=data_request['search_title'], 
            description=data_request['description'],
            mont_page=int(data_request['mount_page']),
            user=user,
            company=data_request['company'])
        try:
            if data_request['company'] == 'ebay':
                result = ejecut_scraping_Ebay(search, int(data_request['mount_page']))
                serializer = SearchSerializer(result)
                return Response({"result":serializer.data}, status=status.HTTP_200_OK) 

            elif data_request['company'] == 'amazon':
                result = ejecut_scraping_Amazon(search, int(data_request['mount_page']))
                serializer = SearchSerializer(result)
                return Response({"result":serializer.data}, status=status.HTTP_200_OK) 

            elif data_request['company'] == 'walmart':
                result = ejecut_scraping_Walmart(search, int(data_request['mount_page']))
                serializer = SearchSerializer(result)
                return Response({"result":serializer.data}, status=status.HTTP_200_OK)

            elif data_request['company'] == 'etsy':
                result = ejecut_scraping_Etsy(search, int(data_request['mount_page']))
                serializer = SearchSerializer(result)
                return Response({"result":serializer.data}, status=status.HTTP_200_OK)

            elif data_request['company'] == 'macys':
                result = ejecut_scraping_Macys(search, int(data_request['mount_page']))
                serializer = SearchSerializer(result)
                return Response({"result":serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            print(str(e))
            return Response({"detail":"Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"detail":"You need send the necessary parameters."}, status=status.HTTP_400_BAD_REQUEST)

class ScheduleScrapingApiView(APIView):
    permission_classes = [IsAuthenticated]

    def str_to_datetime(self,str_datetime):
        date_time = datetime.strptime(str_datetime,"%Y-%m-%dT%H:%M")
        return date_time

    def validate_datetime(self,date_time):
        today = datetime.now() + settings.TASK_MIN_TIME_SCHEDULE

        if today > date_time:
            return False
        return True

    def post(self,request, *args, **kwargs):
        data_request = request.data
        data_request['user_id'] = request.user.id
        search_title = data_request['search_title']
        desc = data_request['description']
        company = data_request['company']
        user_id = data_request['user_id']
        pages = int(data_request['mount_page'])
        dateSearch = data_request['dateSearch']
        date_scheduled = datetime.strptime(dateSearch, '%Y-%m-%dT%H:%M').astimezone(pytz.UTC)

        # validation parameters manual
        validation = manual_validation_values(data_request)
        if validation[0] == False:
            return Response({"detail":validation[1]}, status=status.HTTP_400_BAD_REQUEST)


        str_to_datetime = self.str_to_datetime(data_request['dateSearch'])
        # For validate task be greater one hour 
        if self.validate_datetime(str_to_datetime) == False:
            return Response({"detail":"Your date must be greater than one hour from the current date."}, status=status.HTTP_400_BAD_REQUEST)
        user_model =  get_user_model()
        user = user_model.objects.get(id=user_id)
        search = SearchUserModel.objects.create(search_title=search_title, description=desc,mont_page=pages, user=user,company=company, status_task='PENDING',scheduled_date=date_scheduled)
        result = schedule_scraping_task.apply_async(kwargs={'id_search':search.id, 'pages':pages},eta=str_to_datetime.astimezone(pytz.UTC))
        search.task_id = result.id
        search.save()
        status_task = {
            "task_id":result.id,
            "search_title":search.search_title,
            "description":search.description,
            "company":search.company,
            "mount_page": search.mont_page,
            "scheduled_date":dateSearch,
            "status_task": search.status_task
        }
        return Response({"result":status_task}, status=status.HTTP_200_OK)


class RevokeTaskApiView(APIView):
    permission_classes = [IsAuthenticated]


    def delete(self,request, *args,**kwargs):
        task_id = request.data.get('id',False)
        if task_id:
            search = SearchUserModel.objects.get(task_id=task_id)
            search.status_task = 'REVOKED'
            search.save()
            result = AsyncResult(task_id)
            result.revoke()
            return Response({"detail":"Task canceled successfully."}, status=status.HTTP_200_OK)

        return Response({"detail":"No exist this task in the server"}, status=status.HTTP_400_BAD_REQUEST) 


class TaskScheduledPendingApiView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self,request, *args, **kwargs):
        user_id = request.user.id
        search = SearchUserModel.objects.filter(user_id=user_id, status_task='PENDING',delete=False)
        serializer = SearchSerializer(search, many=True)

        return Response({'result':serializer.data}, status=status.HTTP_200_OK)


