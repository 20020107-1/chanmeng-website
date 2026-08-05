@echo off
title Chanmeng Website - Dev Server
cd /d "C:\Users\19734\product-website"
echo ============================================
echo   Website starting...
echo   Open in browser: http://localhost:3000
echo   Keep this window OPEN while using the site.
echo   Close this window to stop the website.
echo ============================================
echo.
"C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next dev
pause
