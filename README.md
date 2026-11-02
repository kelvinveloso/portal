# Comandos Git - Fluxo de Trabalho

## 1. Clonar o projeto (baixar do GitHub para o computador)
git clone https://github.com/kelvinveloso/portal.git

## 2. Iniciar o projeto pela primeira vez (caso comece do zero na máquina)
git init
git add .
git commit -m "Portal"
git branch -M main
git remote add origin https://github.com/kelvinveloso/portal.git
git push -u origin main

## 3. A cada alteração no código
Criar uma nova branch:
git checkout -b adicionando-novo-texto

*(Criar as alterações no código)*

Publicar as alterações:
git add .
git commit -m "Adiciona um novo paragrafo no site"
git push -u origin adicionando-novo-texto

## 4. Sincronizar após o merge no GitHub
git checkout main
git pull origin main