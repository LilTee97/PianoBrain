@echo off
title Mr Hai
cd /d D:\PianoBrain
if not exist package.json (
  echo Khong tim thay D:\PianoBrain
  pause
  exit /b 1
)
echo.
echo  Mr Hai - go cau hoi roi Enter. Go /quit de thoat.
echo.
call npm run chat
echo.
pause
