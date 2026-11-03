const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Importa as funções do módulo inicial
const { testarConexaoBanco, salvarConfiguracao, validarStatusInicial } = require('./pages/00Inicial/js/inicial.js');

app.use('/pages', express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

app.get('/inicial', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', '00Inicial', 'inicial.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', '01Login', 'login.html'));
});

// Endpoint: Validação Inicial (Usado pelo Index.html)
app.get('/api/status-inicial', async (req, res) => {
    const status = await validarStatusInicial();
    return res.json(status);
});

// Endpoint: Testar Conexão
app.post('/api/testar-conexao', async (req, res) => {
    const resultado = await testarConexaoBanco(req.body);
    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
});

// Endpoint: Salvar Configuração em config.json
app.post('/api/salvar-configuracao', async (req, res) => {
    const resultado = await salvarConfiguracao(req.body);
    return res.status(resultado.sucesso ? 200 : 500).json(resultado);
});

app.listen(port, () => {
    console.log(`🚀 Servidor ativo em http://localhost:${port}`);
});