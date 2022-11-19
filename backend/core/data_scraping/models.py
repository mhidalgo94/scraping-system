from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from django.contrib.auth import get_user_model
from django.conf import settings
from core.accounts.models import NotificationModel

User = get_user_model()

TASK_STATUS = (
    ('SUCCESS','SUCCESS'),
    ('FAILURE','FAILURE'),
    ('REVOKED','REVOKED'),
    ('STARTED','STARTED'),
    ('RECEIVED','RECEIVED'),
    ('REJECTED','REJECTED'),
    ('RETRY','RETRY'),
    ('PENDING','PENDING')
)
COMPANY = settings.COMPANY_TO_MODEL

class SearchUserModel(models.Model):
    user = models.ForeignKey(User,null=True,on_delete=models.CASCADE)
    search_title = models.CharField(verbose_name="Search title",max_length=255)
    mont_page = models.PositiveSmallIntegerField(verbose_name="Mont page",default =1)
    create_date = models.DateTimeField(verbose_name='Date create',auto_now_add=True, auto_now=False)
    create_update = models.DateTimeField(verbose_name='Date update',auto_now=True, auto_now_add=False)
    description = models.TextField(verbose_name="Description", max_length=255, null=True, blank=True)
    company = models.CharField(max_length=15,choices=COMPANY,default='Amazon')
    delete = models.BooleanField(verbose_name="Delete", default=False)
    favorite = models.BooleanField(verbose_name="Favorite", default=False)
    task_id = models.CharField(max_length=255,unique=True,verbose_name='Task ID', blank=True, null=True)
    status_task = models.CharField(verbose_name="Status Task",max_length=20, choices=TASK_STATUS, default='SUCCESS', blank=True,null=True)
    scheduled_date = models.DateTimeField(verbose_name='Date scheduled', null=True, blank=True)


    def __str__(self):
        return f'Search: {self.search_title}--Pages: {self.mont_page}--User: {self.user.user_name} Description:{self.description}--Status task: {self.status_task}'

    class Meta:
        verbose_name = "Search"
        verbose_name_plural = "Searchs"
        db_table = "Search"


class AmazonModel(models.Model):
    
    search =  models.ForeignKey(SearchUserModel, null=True, on_delete=models.CASCADE)
    page =    models.PositiveSmallIntegerField(verbose_name="Page",default =1)
    product = models.CharField(verbose_name="Product name",max_length=255)
    img =     models.URLField(verbose_name="URL image",max_length=500)
    url_product = models.URLField(verbose_name="URL article",max_length=500)
    rate =    models.CharField(verbose_name="Rate", max_length=20,blank=True, null=True)
    price =   models.FloatField(verbose_name="Price")
    create_date = models.DateTimeField(verbose_name='Date create',auto_now_add=True,auto_now=False)
    date_update = models.DateTimeField(verbose_name='Date update',auto_now=True, auto_now_add=False)
    delete= models.BooleanField(verbose_name="Delete", default=False)
    favorite = models.BooleanField(verbose_name="Favorite", default=False)


    def __str__(self):
        return f'{self.product}'


    class Meta:
        verbose_name = "amazon"
        verbose_name_plural = "amazon"
        db_table = "Data Amazon"


class EbayModel(models.Model):
    search =  models.ForeignKey(SearchUserModel, null=True, on_delete=models.CASCADE)
    page =    models.PositiveSmallIntegerField(verbose_name="Page",default =1)
    product = models.CharField(verbose_name="Product name",max_length=255)
    img =     models.URLField(verbose_name="URL image", max_length=500)
    url_product = models.URLField(verbose_name="URL article", max_length=500)
    rate =    models.CharField(verbose_name="Rate", max_length=20,blank=True, null=True)
    top_rate= models.BooleanField(verbose_name="Top rate", default=False)
    price =   models.FloatField(verbose_name="Price")
    old_price =   models.FloatField(verbose_name="Before price")
    delete = models.BooleanField(verbose_name="Delete", default=False)
    create_date = models.DateTimeField(verbose_name='Date create',auto_now_add=True,auto_now=False)
    date_update = models.DateTimeField(verbose_name='Date update',auto_now=True, auto_now_add=False)
    favorite = models.BooleanField(verbose_name="Favorite", default=False)


    @property
    def get_save(self):
        return '%.2f' %(float(self.old_price - self.price))


    def __str__(self):
        return f'{self.product}'


    class Meta:
        verbose_name = "ebay"
        verbose_name_plural = "ebay"
        db_table = "Data Ebay"



class LogRequestModel(models.Model):
    
    search_request = models.ForeignKey(SearchUserModel,verbose_name="Search request", on_delete=models.CASCADE)
    status_code_request = models.PositiveSmallIntegerField(verbose_name="Status code")
    page = models.PositiveSmallIntegerField(verbose_name="Pagination", default=1)
    url_page = models.URLField(verbose_name="URL page", max_length=500)
    date_request = models.DateTimeField(verbose_name='Date request')
    create_date_log = models.DateTimeField(verbose_name='Date create log',auto_now_add=True, auto_now=False)
    delete= models.BooleanField(verbose_name="Delete", default=False)
    


    def __str__(self):

        return f'Search ID: {self.search_request.id}--Page: {self.page}--Status Code: {self.status_code_request}-- Date: {self.date_request}-- Compania: {self.search_request.company}'

    class Meta:
        verbose_name = "log request"
        verbose_name_plural = "logs requests"
        db_table = "Log Request"



@receiver(pre_save, sender=SearchUserModel)
def pre_save_search_update_delete_children(sender,instance,*args,**kwargs):
    AmazonModel.objects.filter(search=instance.id).update(delete=instance.delete)
    EbayModel.objects.filter(search=instance.id).update(delete=instance.delete)
    LogRequestModel.objects.filter(search_request=instance.id).update(delete=instance.delete)


@receiver(post_save, sender=SearchUserModel)
def post_save_seach_user(sender,instance, created, update_fields,**kwargs):
    if instance.task_id and instance.delete==False:
        return
    if created == False and instance.delete==True:
        message = f'You have deleted {instance.search_title}'
    elif created ==False:
        message = f'You have updated {instance.search_title}'
    elif created:
        message = f'You have created {instance.search_title}'

    NotificationModel.objects.create(search=instance, message=message,status=instance.status_task)