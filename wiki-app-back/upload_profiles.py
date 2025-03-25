import pandas as pd
import os
import django

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wiki_server.settings')  # ← settings.py가 들어 있는 폴더명으로 수정
django.setup()

from profiles.models import Profile

def upload_profiles_from_excel(file_path):
    df = pd.read_excel(file_path)

    for _, row in df.iterrows():
        name = str(row['이름']).strip()
        major = str(row['학과']).strip()
        profile_id = f"{name}{major}"

        if Profile.objects.filter(id=profile_id).exists():
            print(f"⚠️ 이미 존재: {profile_id} → 건너뜀")
            continue

        sections = [{
            'title': '정보',
            'type': 'key-value',
            'content': {
                '학과': major
            }
        }]

        Profile.objects.create(
            id=profile_id,
            name=name,
            sections=sections,
            footnotes={}
        )

        print(f"✅ 생성됨: {profile_id}")

    print("✔️ 전체 업로드 완료!")

# 실행
if __name__ == '__main__':
    upload_profiles_from_excel('data.xlsx')
