@echo off
REM Beginner-Friendly Start Script for 2C Funding Lab (Windows)

echo ================================================================
echo          2C Funding Lab - Easy Start Script (Windows)
echo ================================================================
echo.

echo Step 1/6: Checking if required programs are installed...
echo ----------------------------------------------------------------

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    python3 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Python is not installed!
        echo.
        echo Please install Python first:
        echo   - Visit: https://www.python.org/downloads/
        echo   - Download Python 3.8 or newer
        echo   - Run installer and CHECK "Add Python to PATH"
        echo.
        pause
        exit /b 1
    ) else (
        set PYTHON_CMD=python3
    )
) else (
    set PYTHON_CMD=python
)

for /f "tokens=*" %%i in ('%PYTHON_CMD% --version') do set PYTHON_VERSION=%%i
echo [OK] Python is installed: %PYTHON_VERSION%

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo   - Visit: https://nodejs.org/
    echo   - Download the LTS version
    echo   - Run the installer
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js is installed: %NODE_VERSION%

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    echo.
    echo npm should come with Node.js. Please reinstall Node.js.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm is installed: %NPM_VERSION%

echo.
echo Step 2/6: Checking directory structure...
echo ----------------------------------------------------------------

if not exist "backend\" (
    echo [ERROR] Cannot find backend folder!
    echo.
    echo Make sure you are running this script from the 2c-funding-lab folder:
    echo   cd C:\path\to\website-development\2c-funding-lab
    echo   start-easy.bat
    echo.
    pause
    exit /b 1
)

if not exist "frontend\" (
    echo [ERROR] Cannot find frontend folder!
    echo.
    echo Make sure you are running this script from the 2c-funding-lab folder.
    echo.
    pause
    exit /b 1
)

echo [OK] Found backend and frontend folders

echo.
echo Step 3/6: Setting up backend (this may take a minute)...
echo ----------------------------------------------------------------

cd backend

echo Installing Python packages...
%PYTHON_CMD% -m pip install -q -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install Python packages!
    echo.
    echo Please try manually:
    echo   cd backend
    echo   pip install -r requirements.txt
    echo.
    cd ..
    pause
    exit /b 1
)

echo [OK] Backend dependencies installed
cd ..

echo.
echo Step 4/6: Setting up frontend (this may take several minutes)...
echo ----------------------------------------------------------------

cd frontend

if not exist "node_modules\" (
    echo Installing Node.js packages (first time takes longer)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install Node.js packages!
        echo.
        echo Please try manually:
        echo   cd frontend
        echo   npm install
        echo.
        cd ..
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

cd ..

echo.
echo Step 5/6: Starting the application...
echo ----------------------------------------------------------------

echo Starting backend server...
cd backend
start "2C Funding Lab - Backend" /MIN %PYTHON_CMD% main.py
cd ..
timeout /t 3 /nobreak >nul

echo Starting frontend server...
cd frontend
start "2C Funding Lab - Frontend" /MIN npm run dev
cd ..
timeout /t 5 /nobreak >nul

echo.
echo ================================================================
echo                    SUCCESS!
echo ================================================================
echo.
echo The 2C Funding Lab is now running!
echo.
echo OPEN YOUR WEB BROWSER AND GO TO:
echo    http://localhost:3000
echo.
echo You should see the funding opportunities page with cards.
echo.
echo ----------------------------------------------------------------
echo Additional URLs:
echo   - Frontend:  http://localhost:3000
echo   - Backend:   http://localhost:8000
echo   - API Docs:  http://localhost:8000/docs
echo.
echo ----------------------------------------------------------------
echo Two new windows have opened:
echo   - "2C Funding Lab - Backend" (running Python server)
echo   - "2C Funding Lab - Frontend" (running Next.js server)
echo.
echo KEEP THESE WINDOWS OPEN while using the application!
echo.
echo To stop the servers, close both windows.
echo ================================================================
echo.
echo Press any key to open the application in your default browser...
pause >nul

start http://localhost:3000
