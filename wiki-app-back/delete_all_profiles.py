import os
import django

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wiki_server.settings')  # ← 실제 프로젝트 폴더명으로 수정
django.setup()

from profiles.models import Profile

def delete_all_profiles():
    print(f"🗑️ 진짜 삭제중...")
    count, _ = Profile.objects.all().delete()
    print(f"🗑️ 전체 유저 삭제 완료 (총 {count}개)")

if __name__ == '__main__':
    delete_all_profiles()
