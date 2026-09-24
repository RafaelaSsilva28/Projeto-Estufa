//INTEGRAÇÃO DE PIR PARA DECTAR MOVIMENTAÇÃO 
//Será mostrado no FRONTEND

import { Router } from "express";
import { onMessage, TOPICO_ESTADO_PIR } from "../services/mqttClient.js";

const router = Router();

let presencaDetectada = 'Desconhecida';

//Registar a função de escuta dos topicos - DETECTANDO MOVIMENTAÇÃO
onMessage(TOPICO_ESTADO_PIR, (mensagem) => {
    presencaDetectada = mensagem;
    console.log(`Mensagem Recebida no ${TOPICO_ESTADO_PIR}: ${presencaDetectada}`)
})

//Rota GET
router.get(`/movimento`, async (req, res) => {
    try {
        console.log(`Movimento Detectado: ${presencaDetectada}`)
        return res.status(200).json({
            presencaDetectada
        })
    } catch (error) {
        return res.status(500).json({ error: `Erro ao obter dados!` })
    }
});


export default router;