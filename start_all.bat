@echo off
REM --- Backend ---
cd /d %~dp0\backend
call venv\Scripts\activate.bat
echo Iniciando backend...
start cmd /k "venv\Scripts\python.exe main.py"

timeout /t 2

echo Iniciando ngrok...
start cmd /k "ngrok http 5000"

REM --- Frontend ---
cd /d %~dp0\frontend\verbooFront
echo Iniciando frontend...
start cmd /k "npm run dev"

pause
