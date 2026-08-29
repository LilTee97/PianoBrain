@echo off
rem  Bấm đúp là chạy — hỏi link rồi làm hết ba bước.
rem
rem  Chữ hiện ra trong cửa sổ này viết KHÔNG DẤU có chủ ý. Cửa sổ lệnh của
rem  Windows dùng phông chữ cũ, tiếng Việt có dấu hiện ra thành ký tự vỡ. Chú
rem  thích thì có dấu được, vì `@echo off` không in chúng ra.
rem
rem  Lối tắt ngoài Desktop trỏ vào chính file này. Sửa file này thì lối tắt
rem  chạy theo, không phải tạo lại.

chcp 65001 >nul
title Tao MIDI tu video
cd /d "%~dp0..\.."

echo.
echo   ==================================================
echo     TAO FILE MIDI TU MOT VIDEO
echo   ==================================================
echo.

set "link="
set /p link=  1. Dan link video vao day roi bam Enter:

if not defined link (
  echo.
  echo   Chua dan link. Dong cua so nay roi bam dup lai.
  echo.
  pause
  exit /b 1
)

rem  Ba câu hỏi sau đều có sẵn câu trả lời mặc định: bấm Enter là lấy nó.
set "bpm=72"
set /p bpm=  2. Nhip do, so nhip moi phut (Enter = 72):

set "ten=bai"
set /p ten=  3. Dat ten cho bai (Enter = "bai"):

set "bar=4"
set /p bar=  4. So phach moi o nhip (Enter = 4, valse thi go 3):

echo.
echo   Dang chay. Lan dau moi bai mat vai phut.
echo.

python tools\sheet\tu-video.py "%link%" --bpm %bpm% --ten "%ten%" --bar %bar%

echo.
echo   ==================================================
echo     File nam trong:  D:\PianoBrain\video\
echo       %ten%.mid   - mo bang MuseScore de nhin not
echo       %ten%.json  - so do day du
echo   ==================================================
echo.
pause
