@echo off
rem  Bam dup la chay - hoi link roi lam het ba buoc.
rem
rem  CA FILE NAY CHI DUNG CHU KHONG DAU, KE CA CHU THICH. Day khong phai
rem  chuyen tham my, no la loi that da gap:
rem
rem  Ban truoc co `chcp 65001` o dau file va chu thich viet co dau. cmd.exe doc
rem  file .cmd theo VI TRI BYTE, doc toi dau chay toi do. `chcp` doi bang ma
rem  giua chung thi phep dem byte lech, va cmd doc tiep tu GIUA mot dong. Ket
rem  qua: may manh chu Viet trong dong chu thich bi dem ra chay nhu lenh, man
rem  hinh day dong "MOT' is not recognized as an internal or external command".
rem
rem  Nen: khong `chcp`, khong dau, o dau ca. Chu in ra man hinh cung khong dau
rem  vi cua so lenh Windows dung phong chu cu.
rem
rem  Loi tat ngoai Desktop tro thang vao file nay, nen sua file la loi tat chay
rem  theo - khong phai tao lai.

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

rem  Ba cau hoi sau deu co san cau tra loi mac dinh: bam Enter la lay no.
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
echo     File nam trong:  %CD%\video\
echo       %ten%.mid   - mo bang MuseScore de nhin not
echo       %ten%.json  - so do day du
echo   ==================================================
echo.
pause
