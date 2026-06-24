@echo off
setlocal
cd /d "%~dp0server"
start "Morse Trainer Server" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000/"
