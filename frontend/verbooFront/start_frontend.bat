@echo off
REM Entrar na pasta do frontend
cd /d %~dp0

REM Rodar Vite em outro terminal e manter aberto
echo Iniciando frontend...
start cmd /k "npm run dev"

pause
