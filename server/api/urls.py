from django.urls import path
from .views import GetRoutes, CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('', GetRoutes.as_view(), name='get_routes'),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('register/', CreateUserView.as_view(), name="register"),
]