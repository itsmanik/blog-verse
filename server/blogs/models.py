from django.db import models
from users.models import CustomUser
# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True, null=True)

    def __str__(self):
        return f'Tag: {self.name}'

class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, related_name="blogs", blank=True)
    likes = models.PositiveIntegerField(default=0)
    liked_by = models.ManyToManyField(CustomUser, related_name="liked_blogs", blank=True)
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="posts")

    def __str__(self):
        return self.title

class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="comments", null=False, blank=False)
    content = models.TextField()
    commented_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by: {self.author} on {self.blog.title}'
