//INTEGRAÇÃO DE SENSORES SENSOR DE CHUVA E SERVOR MOTOR
//Caso o sensor indique CHUVA - ABRIR TETO COM SERVOR MOTOR

import { Router } from "express";
import { onMessage, TOPICO_STATUS_CHUVA, TOPICO_COBERTURA } from "../services/mqttClient.js";

const router = Router();

let statusChuva = 'Desconhecida'
let estadoTelhado = 'Desconhecido'

//Registar a função de escuta dos topicos - STATUS CHUVA
onMessage(TOPICO_STATUS_CHUVA, (mensagem) => {
    statusChuva = mensagem;
    console.log(`Mensagem Recebida no ${TOPICO_STATUS_CHUVA}: ${statusChuva}`)
})


//Registar a função de escuta dos topicos - ESTADO DO TELHADO
onMessage(TOPICO_COBERTURA, (mensagem) => {
    estadoTelhado = mensagem;
    console.log(`Mensagem Recebida no ${TOPICO_COBERTURA}: ${estadoTelhado}`)
})

//Rota GET
router.get(`/dadosChuva`, async (req, res) => {
    try {
        console.log(`Detecção de Chuva: ${statusChuva}`)
        console.log(`Estado da Cobertura: ${estadoTelhado}`)

        return res.status(200).json({
            statusChuva,
            estadoTelhado
        })
    } catch (error) {
        return res.status(500).json({ error: `Erro ao obter dados!` })
    }
});





export default router;