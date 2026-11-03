-- Criação do banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS seu_portal;
USE seu_portal;

-- Tabela para armazenar as configurações do portal
CREATE TABLE IF NOT EXISTS configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_portal VARCHAR(100) NOT NULL,
    db_host VARCHAR(100) NOT NULL,
    db_porta INT DEFAULT 3306,
    db_usuario VARCHAR(50) NOT NULL,
    db_senha VARCHAR(255),
    db_nome VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);