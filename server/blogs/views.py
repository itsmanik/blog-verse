from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from .serializers import BlogSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Blog
from rest_framework.views import APIView
from rest_framework.response import Response

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

class BlogDetails(RetrieveAPIView):
    queryset = Blog.objects.all()
    permission_classes = [AllowAny]
    serializer_class = BlogSerializer
    lookup_field = 'id'

class LikeBlog(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        blog = Blog.objects.get(id=id)
        user = request.user
        if user in blog.liked_by.all():
            print("if")
            blog.likes -= 1
            blog.liked_by.remove(user)
            blog.save()
            return Response({'liked': False})
        else:
            print("else")
            blog.likes += 1
            blog.liked_by.add(user)
            blog.save()
            return Response({'liked': True})

class UserBlogs(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        blogs = Blog.objects.filter(author=user.id)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)