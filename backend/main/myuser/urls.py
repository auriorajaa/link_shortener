from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
  TokenVerifyView,
)
from django.urls import path

from . import views

urlpatterns = [
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
  path('register/', views.register_user, name='register-user'),
]