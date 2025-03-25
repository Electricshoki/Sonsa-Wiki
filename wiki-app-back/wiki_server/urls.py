from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from profiles.views import ProfileViewSet
from profiles.views import RecentEditsView

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/recent-edits/', RecentEditsView.as_view()),  # ✅ 여기가 문제였음
    path('api/', include('profiles.urls')),
]