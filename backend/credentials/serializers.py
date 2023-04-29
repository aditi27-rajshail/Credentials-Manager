from rest_framework import serializers
from .models import CustomUser, Credential

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        fields = ('id', 'user', 'website_name', 'username', 'password', 'created_at', 'updated_at')
