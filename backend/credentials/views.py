from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import CustomUser, Credential
from .serializers import UserSerializer, CredentialSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(email=email, is_active=True)
            print("check", user)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserSerializer(user)
                return Response({**serializer.data, "user_id": user.id, "token": token.key})
            else:
                return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
        except UserModel.DoesNotExist:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class CredentialListCreateView(generics.ListCreateAPIView):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        website = request.data.get('website')
        username = request.data.get('username')
        password = request.data.get('password') 
        credential = Credential.objects.create(website_name=website, username=username, password=password, user=request.user)
        serializer = self.get_serializer(credential)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CredentialListView(generics.ListAPIView):
    serializer_class = CredentialSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Credential.objects.filter(user_id=user_id)
        
