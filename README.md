# Guia Definitivo de Comandos Git - Fluxo de Trabalho

## 1. Configuração Inicial (Clonar o projeto)
git clone https://github.com/kelvinveloso/portal.git

## 2. Iniciar o projeto pela primeira vez (caso comece do zero)
git init
git add .
git commit -m "Portal"
git branch -M main
git remote add origin https://github.com/kelvinveloso/portal.git
git push -u origin main

## 3. Ciclo de Trabalho (Criar branch e alterar código)
git checkout -b nome-da-sua-branch

(Faça as alterações necessárias nos arquivos e salve)

git add .
git commit -m "Sua mensagem sobre o que alterou"
git push -u origin nome-da-sua-branch

## 4. Finalizar (Juntar com a principal e atualizar)
git checkout main
git merge nome-da-sua-branch
git push origin main

## 5. Sincronização de Emergência (Puxar atualizações)
git pull origin main