//INTEGRAÇÃO DE SENSORES DHT E LCD
//Será transmitido no LCD umidade e temperatura - DEPENDENTES DO DHT

import { Router } from "express";
import { publicar, onMessage, TOPICO_UMIDADE, TOPICO_TEMPERATURA } from "../services/mqttClient.js";

const router = Router();

let temperatura = 'Desconhecida'
let umidade = 'Desconhecida'

//Registar a função de escuta dos topicos - TEMPERATURA
onMessage(TOPICO_TEMPERATURA, (mensagem) => {
    temperatura = mensagem;
    console.log(`Mensagem Recebida no ${TOPICO_TEMPERATURA}: ${temperatura}`)
})

//Registar a função de escuta dos topicos - UMIDADE
onMessage(TOPICO_UMIDADE, (mensagem) => {
    umidade = mensagem;
    console.log(`Mensagem Recebida no ${TOPICO_UMIDADE}: ${umidade}`)
})

router.get(`/dadosClima`, async (req, res) => {
    try {
        console.log(`Temperatura: ${temperatura} °C`)
        console.log(`Umidade: ${umidade}%`)

        return res.status(200).json({
            temperatura,
            umidade
        })
    } catch (error) {
        return res.status(500).json({ error: `Erro ao obter dados!` })
    }
});

export default router


