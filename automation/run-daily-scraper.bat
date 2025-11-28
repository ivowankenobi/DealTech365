@echo off
REM ============================================================
REM   Auto Scraper - Tarea Programada Diaria
REM ============================================================
REM
REM Este archivo se ejecuta automáticamente cada día mediante
REM el Programador de Tareas de Windows para mantener las
REM ofertas actualizadas.
REM
REM ============================================================

echo [%date% %time%] Iniciando automatizacion del scraper...

REM Cambiar al directorio del proyecto
cd /d "c:\Dealtech365"

REM Ejecutar el script de Node.js
node automation\scripts\auto-scrape-and-update.js

REM Capturar el código de salida
set EXIT_CODE=%ERRORLEVEL%

if %EXIT_CODE% EQU 0 (
    echo [%date% %time%] Automatizacion completada exitosamente
) else (
    echo [%date% %time%] Automatizacion fallo con codigo: %EXIT_CODE%
)

REM Escribir al log
echo [%date% %time%] Exit Code: %EXIT_CODE% >> automation\logs\scheduler.log

exit /b %EXIT_CODE%
