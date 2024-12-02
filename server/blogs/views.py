from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import BlogSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Blog

# Create your views here.

class Blogs(ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]

class CreateBlog(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)

