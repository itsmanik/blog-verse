from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class GetRoutes(APIView):
    def get(self, request):
        routes = [
            '/api/token/',
            '/api/token/refresh/',
        ]
        return Response(routes)
    
class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]