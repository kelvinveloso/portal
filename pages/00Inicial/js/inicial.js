const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Caminho do config.json na raiz principal do projeto
const caminhoConfig = path.join(process.cwd(), 'config.json');

// 1. Testa a conexão com a base de dados
async function testarConexaoBanco(config) {
    try {
        const conexao = await mysql.createConnection({
            host: config.host || 'localhost',
            port: Number(config.porta) || 3306,
            user: config.usuario || 'root',
            password: config.senha || '',
            database: config.banco || 'mysql'
        });

        await conexao.ping();
        await conexao.end();

        return { sucesso: true, mensagem: 'Conectado com sucesso!' };
    } catch (erro) {
        return { sucesso: false, mensagem: `Erro na conexão: ${erro.message}` };
    }
}

// 2. Grava os dados no arquivo config.json na raiz do projeto
function salvarConfiguracao(config) {
    return new Promise((resolve) => {
        const conteudo = JSON.stringify(config, null, 4);

        fs.writeFile(caminhoConfig, conteudo, 'utf8', (erro) => {
            if (erro) {
                resolve({ sucesso: false, mensagem: `Falha ao gravar arquivo: ${erro.message}` });
            } else {
                resolve({ sucesso: true, mensagem: 'Configurações salvas com sucesso em config.json!' });
            }
        });
    });
}

// 3. Valida se o config.json existe e se a conexão com o banco funciona
async function validarStatusInicial() {
    if (!fs.existsSync(caminhoConfig)) {
        return { configurado: false, mensagem: 'Arquivo config.json não encontrado.' };
    }

    try {
        const dadosRaw = fs.readFileSync(caminhoConfig, 'utf8');
        const config = JSON.parse(dadosRaw);

        const teste = await testarConexaoBanco(config);
        if (teste.sucesso) {
            return { configurado: true, mensagem: 'Configuração válida e conexão OK!' };
        } else {
            return { configurado: false, mensagem: 'Arquivo existe, mas a conexão falhou.' };
        }
    } catch (erro) {
        return { configurado: false, mensagem: `Erro ao ler configurações: ${erro.message}` };
    }
}

module.exports = { testarConexaoBanco, salvarConfiguracao, validarStatusInicial };