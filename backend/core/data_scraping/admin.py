from django.contrib import admin

from .models import LogRequestModel, SearchUserModel, AmazonModel, EbayModel

# Register your models here.
admin.site.register(LogRequestModel)
admin.site.register(SearchUserModel)
admin.site.register(AmazonModel)
admin.site.register(EbayModel)
