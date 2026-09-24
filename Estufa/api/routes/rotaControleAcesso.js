//INTEGRAÇÃO DE SENSORES RFID E LCD
//Acesso NEGADO ou Acesso PERMITIDO será transmitido pelo LCD - DEPENDENTE DO RFID

import { Router } from "express";

const router = Router();

//Variável Global
let ultimaLeitura = null

//EndPoint para receber a leitura do RFID  -aqui ele aciona o ESP32
router.post(`/leitura`, async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ mensagem: `UID não foi informado!` });
    ultimaLeitura = uid;
    console.log(`Tag lida: ${uid}`);
    return res.json({ mensagem: `Cartão capturado com sucesso`, uid });
});
