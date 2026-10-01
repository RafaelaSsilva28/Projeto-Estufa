// INTEGRAÇÃO DE SENSORES RFID E LCD
// Acesso NEGADO ou Acesso PERMITIDO será transmitido pelo LCD - DEPENDENTE DO RFID

import { Router } from "express";

const router = Router();

console.log("ROTA CONTROLE ACESSO CARREGADA");

// Variável Global
let ultimaLeitura = null;

// Endpoint para receber a leitura do RFID - aqui ele aciona o ESP32
router.post(`/leitura`, async (req, res) => {
    const { codigo_rfid } = req.body;

    if (!codigo_rfid) {
        return res.status(400).json({
            mensagem: `Código RFID não foi informado!`
        });
    }

    ultimaLeitura = codigo_rfid;

    console.log(`Tag lida: ${codigo_rfid}`);

    return res.json({
        mensagem: `Cartão capturado com sucesso`,
        codigo_rfid
    });
});

// Endpoint - aciona a página
router.get(`/leitura`, async (req, res) => {
    return res.json({
        codigo_rfid: ultimaLeitura
    });
});

// Endpoint - aciona a página - chamada quando clicamos no botão
router.post(`/cadastrar`, async (req, res) => {

    // Recebendo no corpo da página
    const { nome, codigo_rfid } = req.body;

    try {
        const comando = `
            INSERT INTO leitor_rfid (nome, codigo_rfid)
            VALUES ($1, $2)
        `;

        const result = await BD.query(comando, [nome, codigo_rfid]);

        // Limpa a variável após salvar com sucesso
        ultimaLeitura = null;

        return res.status(201).json({
            mensagem: `Usuário Cadastrado`
        });

    } catch (error) {

        return res.status(500).json({
            error: `Erro ao cadastrar usuário (Código RFID pode já existir): ` + error
        });
    }
});

// Endpoint - verifica se o RFID está cadastrado
router.post(`/registrar`, async (req, res) => {

    const { codigo_rfid } = req.body;

    try {

        // Busca do usuário através do código do cartão
        const usuario = await BD.query(
            `SELECT * FROM leitor_rfid WHERE codigo_rfid = $1`,
            [codigo_rfid]
        );

        // Se o cartão não estiver cadastrado
        if (usuario.rows.length == 0) {

            return res.status(404).json({
                erro: "Acesso Negado ❌"
            });
        }

        return res.status(201).json({
            mensagem: `Acesso Permitido ✅`,
            nome: usuario.rows[0].nome,
            codigo_rfid: usuario.rows[0].codigo_rfid
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
});

export default router;