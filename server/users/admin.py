from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Specify the fields to display on the user form
    fieldsets = (
        (None, {'fields': ('name', 'username', 'password')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'username', 'password1', 'password2'),
        }),
    )

    # Fields to display in the user list view
    list_display = ('username', 'name')
    # Fields to search in the admin search bar
    search_fields = ('username', 'name')
    ordering = ('username',)

# Register the CustomUser model with the customized admin class
admin.site.register(CustomUser, CustomUserAdmin)
