from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Blog
        fields = ["title", "content", "created_at", "author", "author_username"]
        read_only_fields = ["author"]