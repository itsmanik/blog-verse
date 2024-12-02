from django.urls import path
from .views import Blogs, CreateBlog

urlpatterns = [
    path('', Blogs.as_view(), name='blog_list'),
    path('create/', CreateBlog.as_view(), name='create_blog')
]