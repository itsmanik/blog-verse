from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

class GetRoutes(APIView):
    def get(self, request):
        routes = [
            '/api/token/',
            '/api/token/refresh/',
        ]
        return Response(routes)