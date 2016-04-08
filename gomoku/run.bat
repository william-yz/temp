@echo off
echo "Start"

set /a i=1000

:START
start /min /wait node test
set /a i-=1
if %i% gtr 0 goto START

pause
