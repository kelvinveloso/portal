@echo off
chcp 65001 >nul
color 0A

:: Esta linha obriga o .bat a rodar na mesma pasta onde o arquivo foi salvo
cd /d "%~dp0"

:menu
cls
echo =======================================================
echo          AUTOMATIZADOR GIT - FLUXO DE TRABALHO
echo =======================================================
echo 1. Clonar um projeto
echo 2. Iniciar projeto do zero (Primeiro Commit)
echo 3. Criar nova branch, empacotar (Commit) e enviar (Push)
echo 4. Finalizar: Fazer Merge com a main e atualizar nuvem
echo 5. Sincronizar de Emergencia (Pull main)
echo 6. Sair
echo =======================================================
set /p opcao="Escolha uma opcao (1-6): "

if "%opcao%"=="1" goto clonar
if "%opcao%"=="2" goto iniciar
if "%opcao%"=="3" goto ciclo
if "%opcao%"=="4" goto merge
if "%opcao%"=="5" goto sincronizar
if "%opcao%"=="6" goto sair

echo Opcao invalida!
pause
goto menu

:clonar
cls
echo --- 1. Clonar o projeto ---
set /p url="Cole a URL do repositorio (ex: https://github.com/kelvinveloso/portal.git): "
git clone %url%
echo.
pause
goto menu

:iniciar
cls
echo --- 2. Iniciar projeto do zero ---
set /p url="Cole a URL do repositorio no GitHub: "
git init
git add .
git commit -m "Portal"
git branch -M main
git remote add origin %url%
git push -u origin main
echo.
pause
goto menu

:ciclo
cls
echo --- 3. Ciclo de Trabalho (Branch, Commit e Push) ---
set /p branch="Digite o nome da nova branch (sem espacos): "
git checkout -b %branch%
echo.
echo [AVISO] A branch %branch% foi criada. 
echo Faca suas alteracoes nos arquivos, salve no VS Code e pressione qualquer tecla aqui para continuar.
pause
echo.
git add .
set /p mensagem="Digite a mensagem do commit (ex: Adiciona novo paragrafo): "
git commit -m "%mensagem%"
git push -u origin %branch%
echo.
pause
goto menu

:merge
cls
echo --- 4. Finalizar (Merge e Push) ---
set /p branch="Digite o nome da branch que deseja juntar com a main: "
git checkout main
git merge %branch%
git push origin main
echo.
pause
goto menu

:sincronizar
cls
echo --- 5. Sincronizar de Emergencia ---
git checkout main
git pull origin main
echo.
pause
goto menu

:sair
exit