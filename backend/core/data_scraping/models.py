
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class SearchUserModel(models.Model):
    COMPANY=[
        ('amazon','amazon'),
        ('ebay','ebay'),
    ]
    user = models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
    search_title = models.CharField(verbose_name="Search title",max_length=255)
    mont_page = models.PositiveSmallIntegerField(verbose_name="Mont page",default =1)
    create_date = models.DateTimeField(verbose_name='Date create',auto_now_add=True, auto_now=False)
    create_update = models.DateTimeField(verbose_name='Date update',auto_now=True, auto_now_add=False)
    description = models.TextField(verbose_name="Description", max_length=255, null=True, blank=True)
    company = models.CharField(max_length=15,choices=COMPANY,default='Amazon')
    delete= models.BooleanField(verbose_name="Delete", default=False)

    # crear un etiqueta y una descripcion para tus busqueda

    def __str__(self):
        return f'Search: {self.search_title}--Pages: {self.mont_page}--User: {self.user.user_name}'

    class Meta:
        verbose_name = "Search"
        verbose_name_plural = "Searchs"
        db_table = "Search"


class AmazonModel(models.Model):
    
    search =  models.ForeignKey(SearchUserModel, null=True, on_delete=models.SET_NULL)
    page =    models.PositiveSmallIntegerField(verbose_name="Page",default =1)
    product = models.CharField(verbose_name="Product name",max_length=255)
    img =     models.URLField(verbose_name="URL image")
    url_product = models.URLField(verbose_name="URL article")
    rate =    models.CharField(verbose_name="Rate", max_length=20,blank=True, null=True)
    price =   models.FloatField(verbose_name="Price")
    create_date = models.DateTimeField(verbose_name='Date create',auto_now_add=True,auto_now=False)
    date_update = models.DateTimeField(verbose_name='Date update',auto_now=True, auto_now_add=False)
    delete= models.BooleanField(verbose_name="Delete", default=False)

    def __str__(self):
        return f'{self.product}'


    class Meta:
        verbose_name = "amazon"
        verbose_name_plural = "amazon"
        db_table = "Data Amazon"


class EbayModel(models.Model):
    search =  models.ForeignKey(SearchUserModel, null=True, on_delete=models.SET_NULL)
    page =    models.PositiveSmallIntegerField(verbose_name="Page",default =1)
    product = models.CharField(verbose_name="Product name",max_length=255)
    img =     models.URLField(verbose_name="URL image")
    url_product = models.URLField(verbose_name="URL article")
    rate =    models.CharField(verbose_name="Rate", max_length=20,blank=True, null=True)
    top_rate= models.BooleanField(verbose_name="Top rate", default=False)
    price =   models.FloatField(verbose_name="Price")
    old_price =   models.FloatField(verbose_name="Before price")
    delete = models.BooleanField(verbose_name="Delete", default=False)
    create_date = models.DateTimeField(verbose_name='Date create',auto_now_add=True,auto_now=False)
    date_update = models.DateTimeField(verbose_name='Date update',auto_now=True, auto_now_add=False)

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
    url_page = models.URLField(verbose_name="URL page")
    date_request = models.DateTimeField(verbose_name='Date request')
    create_date_log = models.DateTimeField(verbose_name='Date create log',auto_now_add=True, auto_now=False)
    delete= models.BooleanField(verbose_name="Delete", default=False)



    def __str__(self):

        return f'Search ID: {self.search_request.id}--Page: {self.page}--Status Code: {self.status_code_request}-- Date: {self.date_request}-- Compania: {self.search_request.company}'

    class Meta:
        verbose_name = "log request"
        verbose_name_plural = "logs requests"
        db_table = "Log Request"