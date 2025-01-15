from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['username'] = user.username
    return token
  
class UserRegisterSerializer(ModelSerializer):
  username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
  password = serializers.CharField(write_only=True, required=True)
  password2 = serializers.CharField(write_only=True, required=True)
  
  class Meta:
    model = User
    fields = ('username', 'password', 'password2')
    
  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({'password': "Password didn't match."})
    
    return attrs
  
  def create(self, validated_data):
    user = User.objects.create(
      username = validated_data['username']
    )
    
    user.set_password(validated_data['password'])
    user.save()
    
    return user