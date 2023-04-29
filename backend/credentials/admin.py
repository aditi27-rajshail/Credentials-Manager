from django.contrib import admin
from .models import CustomUser, Credential

admin.site.register(CustomUser)
admin.site.register(Credential)
