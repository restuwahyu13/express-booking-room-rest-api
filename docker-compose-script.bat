@echo off
title DOCKER COMPOSE RUNNER FOR WINDOWS
:start
cls
echo off &echo.&echo off
echo ===========================================================
echo            DOCKER COMPOSE RUNNER FOR WINDOWS
echo ===========================================================
echo off &echo.&echo off

echo  1. Docker Compose Production With Build
echo  2. Docker Compose Development With Build
echo  3. Docker Compose Production No Build
echo  4. Docker Compose Development No Build
echo  5. Docker Compose Production Down
echo  6. Docker Compose Development Down
echo  0. Leave

echo off &echo.&echo off

choice /n /c:1234560 /m "enter your docker compose environment type ?"

if %errorlevel% equ 1 goto productionb
if %errorlevel% equ 2 goto developmentb
if %errorlevel% equ 3 goto productionnb
if %errorlevel% equ 4 goto developmentnb
if %errorlevel% equ 5 goto dockerdownprod
if %errorlevel% equ 6 goto dockerdowndev
if %errorlevel% equ 7 goto leavecommand

:productionb
cls
call docker-compose -f docker-compose.prod.yml up --build -d
msg %username% "docker compose up production with build successfuly"
exit

:developmentb
cls
call docker-compose -f docker-compose.dev.yml up --build -d
msg %username% "docker compose up development with build successfuly"
exit

:productionnb
cls
call docker-compose -f docker-compose.prod.yml up -d
msg %username% "docker compose up production no build successfuly"
exit

:developmentnb
cls
call docker-compose -f docker-compose.dev.yml up -d
msg %username% "docker compose up development  no build successfuly"
exit

:dockerdownprod
cls
call docker-compose -f docker-compose.prod.yml down
msg %username% "docker compose down production successfuly"
exit

:dockerdowndev
cls
call docker-compose -f docker-compose.dev.yml down
msg %username% "docker compose down development successfuly"
exit

:leavecommand
exit