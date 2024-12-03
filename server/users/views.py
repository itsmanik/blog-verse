from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class CreateUser(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserInfo(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user