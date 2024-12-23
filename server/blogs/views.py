from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, ListCreateAPIView
from .serializers import BlogSerializer, CommentSerializer, TagSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Blog, Comment, Tag
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import google.generativeai as genai
from django.core.serializers import serialize
import json

genai.configure(api_key=settings.API_KEY)   

# Create your views here.

class Blogs(ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        print("nigga")
        tags_json = serialize('json', Tag.objects.all())

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"From these tags: {', '.join(tags_json)}, which one is trending based on current events? Return an array with two elements, first be the id and second be the reason for choosing that. Let it be an array dont do any formatting, also dont add that ```json or anything like that")
        json_response = json.loads(response.text)
        print(json_response)
        
        trending_tag = Tag.objects.get(id=json_response[0])
        trending_blogs = Blog.objects.filter(tags=trending_tag)
        remaining_blogs = Blog.objects.exclude(tags=trending_tag)
        combined_blogs = list(trending_blogs) + list(remaining_blogs)
        # return Blog.objects.all()
        return combined_blogs

class Tags(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [AllowAny]

class CreateBlog(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)

class DeleteBlog(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'id'

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("You do not have permission to delete this blog.")
        instance.delete()


class BlogDetails(RetrieveAPIView):
    queryset = Blog.objects.all()
    permission_classes = [AllowAny]
    def retrieve(self, request, *args, **kwargs):
        blog = Blog.objects.get(id=kwargs['id'])
        blog.views += 1
        blog.save()
        serializer = BlogSerializer(blog, many=False)
        return Response(serializer.data)

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
    
class Comments(ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        blog = Blog.objects.get(id=self.kwargs['blog_id'])
        return Comment.objects.filter(blog=blog)

    def perform_create(self, serializer):
        user = self.request.user
        blog = Blog.objects.get(id=self.kwargs['blog_id'])
        serializer.save(author=user, blog=blog)