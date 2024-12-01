from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
# from rest_framework.decorators import api_view
from rest_framework.views import APIView

# Create your views here.

class GetRoutes(APIView):
    def get(self, request):
        routes = [
            '/api/token/',
            '/api/token/refresh/',
        ]
        return Response(routes)

# @api_view(['GET'])  
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/token/refresh/',
#     ]
#     return Response(routes)