from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

# Create your views here.

class CreateUser(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]