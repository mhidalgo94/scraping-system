from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

# Create your models here.
class UserManager(BaseUserManager):

       
    def create_user(self,email,user_name,password=None):
        if not email:
            raise ValueError('User most have an email address')
        elif not user_name:
            raise ValueError('User most have an user name')

        user = self.model(email=self.normalize_email(email), user_name=user_name)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_staffuser(self,email, user_name,password):
        
        user = self.create_user(email,user_name,password = password)
        user.staff = True
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,user_name, password):

        user = self.create_user(
            email, user_name,password=password
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(verbose_name="email address",max_length=255,unique=True)
    user_name = models.CharField(verbose_name="user name", max_length=150, unique=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    # Overwrite objects
    objects =  UserManager()

    USERNAME_FIELD = 'user_name'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS  = ['email']

    def get_full_name(self):
        return f'{self.user_name} : {self.email}'

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
        return self.admin








