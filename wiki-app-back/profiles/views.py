from rest_framework import viewsets, filters, generics
from rest_framework.views import APIView               
from rest_framework.response import Response           
from .models import Profile, ProfileEditHistory
from .serializers import ProfileSerializer
from rest_framework.permissions import AllowAny


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'  # URL에서 <id>로 찾기
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # 이름으로 검색 가능
    permission_classes = [AllowAny]  # ✅ 인증 없이 접근 가능

        
    def perform_update(self, serializer):
        instance = serializer.save()
        editor_id = self.request.data.get('editor_id', 'unknown')
        ProfileEditHistory.objects.create(profile=instance, editor_id=editor_id)

class RecentEditsView(APIView):
    def get(self, request):
        recent = ProfileEditHistory.objects.select_related('profile').order_by('-edited_at')[:10]
        data = [{
            'profile_id': e.profile.id,
            'name': e.profile.name,
            'editor_id': e.editor_id,
            'edited_at': e.edited_at
        } for e in recent]
        return Response(data)
    
class ProfileCreateView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer