@echo off
REM Entrar na pasta do backend
cd /d %~dp0

REM Ativar o virtual environment
call venv\Scripts\activate.bat

REM Iniciar backend usando o Python do venv
echo Iniciando backend...
start cmd /k "venv\Scripts\python.exe main.py"

REM Esperar 2 segundos
timeout /t 2

REM Iniciar ngrok
echo Iniciando ngrok...
start cmd /k "ngrok http 5000"

echo Backend e ngrok rodando!
pause
