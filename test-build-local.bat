@echo off
REM Local build test script for Windows - Run this to test the build locally before deploying to Netlify

echo 🔍 Testing Netlify build locally...
echo.

REM Check if package.json exists
echo 1. Checking package.json...
if exist package.json (
    echo    ✅ package.json exists
) else (
    echo    ❌ package.json NOT found!
    exit /b 1
)

REM Check Node version
echo.
echo 2. Checking Node version...
node -v
if %ERRORLEVEL% NEQ 0 (
    echo    ❌ Node.js is not installed or not in PATH!
    exit /b 1
)
echo    ✅ Node.js is available

REM Install dependencies
echo.
echo 3. Installing dependencies (npm ci)...
call npm ci
if %ERRORLEVEL% NEQ 0 (
    echo    ❌ Failed to install dependencies!
    exit /b 1
)
echo    ✅ Dependencies installed successfully

REM Run the build
echo.
echo 4. Running build command (npm run build:all)...
call npm run build:all
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo    ❌ Build failed! Check the error messages above.
    exit /b 1
)

REM Check if dist folder exists and has required files
echo.
echo 5. Verifying build output...
if exist "dist\student.html" (
    echo    ✅ student.html found
) else (
    echo    ❌ student.html NOT found!
    exit /b 1
)

if exist "dist\admin.html" (
    echo    ✅ admin.html found
) else (
    echo    ❌ admin.html NOT found!
    exit /b 1
)

echo.
echo 🎉 All checks passed! Your build should work on Netlify.
echo.
echo 📁 Build output location: .\dist
echo    - Student app: dist\student.html
echo    - Admin app: dist\admin.html
pause

