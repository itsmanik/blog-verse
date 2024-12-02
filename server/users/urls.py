from django.urls import path
from .views import CreateUser
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('register/', CreateUser.as_view(), name="register"),
]