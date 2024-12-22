from rest_framework import serializers
from .models import Blog, Comment

class BlogSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    tag_names = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ["id", "title", "content", "created_at", "author", "author_username", "likes", "views", "tags", "tag_names"]
        read_only_fields = ["author"]

    def get_tag_names(self, obj):
        return [tag.name for tag in obj.tags.all()]


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'blog', 'author', 'content', 'commented_at', 'author_username']
        read_only_fields = ['blog', 'author', 'commented_at']