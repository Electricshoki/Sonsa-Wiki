@echo off

echo [1] 백엔드 서버 시작
cd wiki-app-back
call venv\Scripts\activate
start cmd /k python manage.py runserver 0.0.0.0:8000

timeout /t 3


echo [2] 프론트엔드 서버 시작
cd ..\wiki-app-front\wiki-app
start cmd /k serve -s build -l 5000 
