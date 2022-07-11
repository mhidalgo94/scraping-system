
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class SearchUserModel(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    search_title = models.CharField(verbose_name="search title",max_length=255)
    mont_page = models.PositiveSmallIntegerField(verbose_name="mont page",default =1)
    create_date = models.DateTimeField(verbose_name='date create',auto_now_add=True, auto_now=False)
    create_update = models.DateTimeField(verbose_name='date update',auto_now=True, auto_now_add=False)
    

    def __str__(self):
        return f'Search: {self.search_title}--Pages: {self.mont_page}--User: {self.user.user_name}'

    class Meta:
        verbose_name = "Search"
        verbose_name_plural = "Searchs"
        db_table = "Search"


class AmazonModel(models.Model):
    search =  models.ForeignKey(SearchUserModel, null=True, on_delete=models.CASCADE)
    page =    models.PositiveSmallIntegerField(verbose_name="page",default =1)
    product = models.CharField(verbose_name="product name",max_length=255)
    img =     models.URLField(verbose_name="URL image")
    url_product = models.URLField(verbose_name="URL article")
    rate =    models.CharField(verbose_name="rate", max_length=20,blank=True, null=True)
    price =   models.FloatField(verbose_name="price")
    create_date = models.DateTimeField(verbose_name='date create',auto_now_add=True,auto_now=False)
    create_update = models.DateTimeField(verbose_name='date update',auto_now=True, auto_now_add=False)

    def __str__(self):
        return f'{self.product}'


    class Meta:
        verbose_name = "amazon"
        verbose_name_plural = "amazon"
        db_table = "Data Amazon"


class EbayModel(models.Model):
    search =  models.ForeignKey(SearchUserModel, null=True, on_delete=models.CASCADE)
    page =    models.PositiveSmallIntegerField(verbose_name="page",default =1)
    product = models.CharField(verbose_name="product name",max_length=255)
    img =     models.URLField(verbose_name="URL image")
    url_product = models.URLField(verbose_name="URL article")
    rate =    models.CharField(verbose_name="rate", max_length=20,blank=True, null=True)
    top_rate= models.BooleanField(verbose_name="top rate", default=False)
    price =   models.FloatField(verbose_name="price")
    old_price =   models.FloatField(verbose_name="before price")
    create_date = models.DateTimeField(verbose_name='date create',auto_now_add=True,auto_now=False)
    create_update = models.DateTimeField(verbose_name='date update',auto_now=True, auto_now_add=False)

    def __str__(self):
        return f'{self.product}'


    class Meta:
        verbose_name = "ebay"
        verbose_name_plural = "ebay"
        db_table = "Data Ebay"



class LogRequestModel(models.Model):
    COMPANY=[
        ('amazon','amazon'),
        ('ebay','ebay'),
    ]
    search_request = models.ForeignKey(SearchUserModel,verbose_name=" search request", on_delete=models.CASCADE)
    status_code_request = models.PositiveSmallIntegerField(verbose_name="status code")
    page = models.PositiveSmallIntegerField(verbose_name="pagination", default=1)
    url_page = models.URLField(verbose_name="URL page")
    company = models.CharField(max_length=15,choices=COMPANY,default='amazon')
    date_request = models.DateTimeField(verbose_name='date request')
    create_date_log = models.DateTimeField(verbose_name='date create log',auto_now_add=True, auto_now=False)



    def __str__(self):

        return f'Search ID: {self.search_request.id}--Page: {self.page}--Status Code: {self.status_code_request}-- Date: {self.date_request}-- Compania: {self.company}'

    class Meta:
        verbose_name = "log request"
        verbose_name_plural = "logs requests"
        db_table = "Log Request"