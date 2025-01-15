from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .serializers import UserRegisterSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
  serializer = UserRegisterSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(status=status.HTTP_200_OK)
  
  return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)