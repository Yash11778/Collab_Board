@echo off
color 0A
echo.
echo  ╔════════════════════════════════════════════════╗
echo  ║   COLLAB BOARD - QUICK DEPLOYMENT MENU        ║
echo  ╚════════════════════════════════════════════════╝
echo.
echo  [1] First Time Setup (GitHub + Vercel)
echo  [2] Quick Deploy (Push to GitHub)
echo  [3] Check Git Status
echo  [4] View Deployment Guide
echo  [5] Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Starting first time setup...
    call setup-vercel.bat
) else if "%choice%"=="2" (
    echo.
    echo Starting quick deployment...
    call deploy.bat
) else if "%choice%"=="3" (
    echo.
    echo Git Status:
    echo ============
    git status
    echo.
    pause
) else if "%choice%"=="4" (
    echo.
    echo Opening deployment guide...
    start SINGLE_DEPLOYMENT.md
    pause
) else if "%choice%"=="5" (
    echo.
    echo Goodbye! Happy Coding! 🚀
    timeout /t 2 >nul
    exit
) else (
    echo.
    echo Invalid choice! Please enter 1-5.
    timeout /t 2 >nul
    start-deployment.bat
)
