@echo off
echo ========================================
echo   FIRST TIME SETUP - VERCEL DEPLOYMENT
echo ========================================
echo.

echo This script will help you set up your project for Vercel deployment.
echo.
pause

REM Step 1: Git Setup
echo [STEP 1/6] Setting up Git repository...
if not exist ".git" (
    echo Initializing git repository...
    git init
    echo Git initialized!
) else (
    echo Git already initialized.
)
echo.

REM Step 2: Add remote
echo [STEP 2/6] GitHub Repository Setup
echo.
echo Make sure you have created a repository on GitHub first!
echo Repository URL format: https://github.com/USERNAME/REPO_NAME.git
echo.
set /p github_url="Enter your GitHub repository URL: "

if "%github_url%"=="" (
    echo [ERROR] GitHub URL cannot be empty!
    pause
    exit /b 1
)

git remote remove origin 2>nul
git remote add origin %github_url%
echo Remote added: %github_url%
echo.

REM Step 3: Branch setup
echo [STEP 3/6] Setting up main branch...
git branch -M main
echo.

REM Step 4: First commit
echo [STEP 4/6] Creating first commit...
git add .
git commit -m "Initial commit - Ready for Vercel deployment"
echo.

REM Step 5: Push to GitHub
echo [STEP 5/6] Pushing to GitHub...
git push -u origin main
echo.

REM Step 6: Instructions
echo [STEP 6/6] Vercel Deployment Instructions
echo ========================================
echo.
echo Your code is now on GitHub!
echo.
echo NEXT STEPS:
echo -----------
echo 1. Go to https://vercel.com/dashboard
echo 2. Click "Add New" - "Project"
echo 3. Import your GitHub repository
echo 4. Configure settings:
echo    - Framework Preset: Other
echo    - Root Directory: (leave empty)
echo    - Build Command: (leave empty)
echo    - Output Directory: (leave empty)
echo.
echo 5. Add Environment Variables:
echo    MONGODB_URI = mongodb+srv://yashdharme:yash@cluster0.blgov.mongodb.net/collabboard?retryWrites=true^&w=majority
echo    JWT_SECRET = 257da4b5300c116f8c1a4917cc3990a0bed84b07d42827647cd9021c1b767f1a
echo    NODE_ENV = production
echo.
echo 6. Click Deploy!
echo.
echo ========================================
echo.
echo After first deployment, you can use deploy.bat for quick updates!
echo.
pause
