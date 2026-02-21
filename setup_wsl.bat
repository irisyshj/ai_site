@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Claude Code Agent Team - WSL Setup Check
echo ========================================
echo.

REM Check if WSL is installed
wsl --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] WSL is not installed on this system.
    echo.
    echo To install WSL, run the following command in PowerShell as Administrator:
    echo.
    echo     wsl --install
    echo.
    echo After installation, restart your computer and run this script again.
    echo.
    pause
    exit /b 1
)

echo [OK] WSL is installed.
echo.

REM Check WSL status
wsl --status >nul 2>&1
if %errorlevel% equ 0 (
    echo WSL Status:
    wsl --status
    echo.
)

REM List installed distributions
echo Installed WSL Distributions:
wsl --list --verbose
echo.

REM Check if any distribution is installed
wsl --list --quiet | findstr /r "." >nul
if %errorlevel% neq 0 (
    echo [WARNING] No WSL distributions found.
    echo.
    echo Please install a WSL distribution (Ubuntu is recommended):
    echo.
    echo     wsl --install -d Ubuntu
    echo.
    echo Or visit the Microsoft Store to install a Linux distribution.
    echo.
    pause
    exit /b 1
)

REM Get the default distribution
for /f "tokens=*" %%i in ('wsl --list --quiet') do (
    set DEFAULT_DIST=%%i
    goto :found_dist
)
:found_dist

echo [OK] Found WSL distribution: !DEFAULT_DIST!
echo.

REM Check if tmux is installed in WSL
echo Checking if tmux is installed in WSL...
wsl -d !DEFAULT_DIST! -- which tmux >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] tmux is not installed in WSL.
    echo.
    echo To install tmux, run the install_tmux.sh script in WSL:
    echo.
    echo   1. Open WSL: wsl
    echo   2. Navigate to this directory: cd /mnt/c/20_brand_site
    echo   3. Run: bash install_tmux.sh
    echo.
    echo Or run the following command directly:
    echo.
    echo     wsl -d !DEFAULT_DIST! -- bash /mnt/c/20_brand_site/install_tmux.sh
    echo.
) else (
    echo [OK] tmux is already installed in WSL.
    echo.
    echo To start tmux, run in WSL:
    echo     tmux
    echo.
    echo Or start directly from Windows:
    echo     wsl -d !DEFAULT_DIST! -- tmux
    echo.
)

REM Provide next steps
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Open WSL: wsl
echo 2. Navigate to project: cd /mnt/c/20_brand_site
echo 3. Install tmux: bash install_tmux.sh
echo 4. Start tmux: tmux new -s work
echo.
echo For detailed instructions, see README_WSL_TMUX.md
echo.

pause
