from django.urls import path
from .views import GetRoutes
from rest_framework_simplejwt.views import TokenObtainPairView
from users.views import CreateUser


urlpatterns = [
    path('', GetRoutes.as_view(), name='get_routes'),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('register/', CreateUser.as_view(), name="register"),
]