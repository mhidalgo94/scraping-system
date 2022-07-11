from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email','user_name', 'staff','is_active','password',)
    list_filter = ('email','user_name', 'staff','is_active','password',)
    fieldsets = (
        (None, {'fields': ('email','user_name', 'password')}),
        ('Permissions', {'fields': ('staff', 'is_active','admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','user_name', 'password1', 'password2', 'staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
