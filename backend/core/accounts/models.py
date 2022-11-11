import uuid
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings

COMPANY = settings.COMPANY_TO_MODEL

# Create your models here.
class UserManager(BaseUserManager):

       
    def create_user(self,email,user_name,firstname,lastname,password=None,**extra_fields):
        if not email:
            raise ValueError('User most have an email address')
        elif not user_name:
            raise ValueError('User most have an user name')
        elif not firstname:
            raise ValueError('User most have an user firstname')
        elif not lastname:
            raise ValueError('User most have an user lastname')

        user = self.model(email=self.normalize_email(email), user_name=user_name,firstname=firstname,lastname=lastname,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_staffuser(self,email, user_name,password):
        
        user = self.create_user(email,user_name,password = password)
        user.staff = True
        user.save(using=self._db)
        return user

    
    def create_superuser(self,email,user_name,firstname, lastname, password):

        user = self.create_user(
            email, user_name,firstname, lastname,password
        )
        user.is_superuser = True
        user.staff = True
        user.admin = True
        user.is_active = True
        user.save(using=self._db)
        return user



def upload_to_image(instance, filename):
    return 'user/images/%s/%s' % (instance.user_name, filename)

class User(AbstractBaseUser,PermissionsMixin):
    firstname = models.CharField(verbose_name="first name", max_length=100)
    lastname = models.CharField(verbose_name="last name", max_length=100 )
    email = models.EmailField(verbose_name="email address",max_length=200,unique=True)
    user_name = models.CharField(verbose_name="user name", max_length=100, unique=True)
    is_active = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    id_verify = models.UUIDField(default = uuid.uuid4, editable = False)
    date_update = models.DateTimeField(auto_now=True)
    img = models.ImageField(verbose_name='Imagen', null=True, blank=True, upload_to=upload_to_image)

    # Overwrite objects
    objects =  UserManager()
    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS  = ['email', 'firstname', 'lastname']
    EMAIL_FIELD = 'email'

    def upload_to_image(self):
        return f'{self.user_name}/'

    def get_full_name(self):
        return f'{self.firstname} {self.lastname}'

    def get_short_name(self):
        return self.user_name

    def __str__(self):
        return self.get_full_name()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.staff


@receiver(post_save, sender=User)
def post_create_verify_user(sender,instance,created,**kwargs):
    if created and instance.is_admin==False:
        message = f'Hi {instance.get_full_name()}.\Y have created an account in our system.\nTo verify your account use this code:{instance.id_verify}'
        send_mail('Registro de Cuenta.', message, settings.EMAIL_HOST_USER,[instance.email])



class NotificationModel(models.Model):
    company = models.CharField(verbose_name="Company",max_length=15)
    recipient = models.ManyToManyField(User)
    message = models.TextField(verbose_name="Message")
    read = models.BooleanField(verbose_name="Read",default=False)
    status = models.CharField(verbose_name="Status",max_length=15)
    recieved_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        db_table = "Notification"