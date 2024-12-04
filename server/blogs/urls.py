from django.urls import path
from .views import Blogs, CreateBlog, BlogDetails, LikeBlog, UserBlogs

urlpatterns = [
    path('', Blogs.as_view(), name='blog_list'),
    path('create/', CreateBlog.as_view(), name='create_blog'),
    path('<int:id>/', BlogDetails.as_view(), name='blog_details'),
    path('<int:id>/like/', LikeBlog.as_view(), name='like_blog'),
    path('my-blogs/', UserBlogs.as_view(), name='user_blogs')
]