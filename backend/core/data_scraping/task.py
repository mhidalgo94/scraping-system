from celery import Task, shared_task
from celery.result import AsyncResult
from celery.signals import task_failure, task_success
from core.data_scraping.api.serializer_search import SearchUserSerializer
from core.data_scraping.models import SearchUserModel
from core.script.amazon_store import ejecut_scraping_Amazon
from core.script.ebay_store import ejecut_scraping_Ebay

# Calss Abstract for save status in Model
# class SaveStatusModel(Task):
#     abstract = True

#     def after_return(self, *args, **kwargs):
#         print('Mi clase abstract: {0!r}'.format(self.request))



@shared_task
def scraping_task(dicc):
    if dicc['company'] == 'ebay':
        result = ejecut_scraping_Ebay(dicc['search'],dicc['desc'], int(dicc['pages']), dicc['company'],dicc['user_id'])
    elif dicc['company'] == 'amazon':
        result = ejecut_scraping_Amazon(dicc['search'],dicc['desc'], int(dicc['pages']), dicc['company'],dicc['user_id'])

    serializer = SearchUserSerializer(result)
    return serializer.data

@shared_task(bind=True)
def schedule_scraping_task(self,**kwargs,):
    search = SearchUserModel.objects.get(id=int(kwargs['id_search']))
    if search.company == 'ebay':
        result = ejecut_scraping_Ebay(search, int(search.mont_page))
        
    elif search.company == 'amazon':
        result = ejecut_scraping_Amazon(search, int(search.mont_page))
    
    return SearchUserSerializer(result).data

# Signal before before task publish
# Signal no work version 5.2.7, change to  4.2
@task_success.connect#(sender='core.data_scraping.task.schedule_scraping_task')
def task_send_success(sender=None, headers=None, body=None,**kwargs):
    id_search = int(sender.request.kwargs['id_search'])
    search = SearchUserModel.objects.get(id=id_search)
    search.status_task = 'SUCCESS'
    search.save()

@task_failure.connect#(sender='core.data_scraping.task.schedule_scraping_task')
def task_send_failure(sender=None, headers=None, body=None,**kwargs):
    id_search = sender.request.kwargs['id_search']
    search = SearchUserModel.objects.get(id=id_search)
    search.status_task = 'FAILURE'
    search.save()

    