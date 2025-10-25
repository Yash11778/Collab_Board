@echo off
echo ========================================
echo   COLLAB BOARD - VERCEL DEPLOYMENT
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo [ERROR] Git repository not initialized!
    echo Run: git init
    pause
    exit /b 1
)

echo [STEP 1/4] Checking for changes...
git status

echo.
echo [STEP 2/4] Adding all files to git...
git add .

echo.
echo [STEP 3/4] Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Deploy to Vercel

git commit -m "%commit_message%"

echo.
echo [STEP 4/4] Pushing to GitHub...
git push

echo.
echo ========================================
echo   DEPLOYMENT INITIATED!
echo ========================================
echo.
echo Your code has been pushed to GitHub.
echo Vercel will automatically deploy in 1-2 minutes.
echo.
echo Check deployment status at:
echo https://vercel.com/dashboard
echo.
echo Your app will be live at:
echo https://your-app-name.vercel.app
echo.
pause
