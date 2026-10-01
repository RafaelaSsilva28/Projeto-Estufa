import { Router } from "express";
import { buscarMensagens, TOPICO_ESTADO_PIR } from "../services/mqttClient.js";

const router = Router();

router.get("/movimento", async (req, res) => {
    try {
        const dados = await buscarMensagens([TOPICO_ESTADO_PIR]);

        res.set("Cache-Control", "no-store");

        return res.json({
            presencaDetectada: dados[TOPICO_ESTADO_PIR],
        });
    } catch (error) {
        console.error("Erro ao buscar movimento:", error.message);

        return res.status(503).json({
            error: "Não foi possível obter os dados de movimento.",
        });
    }
});

export default router;
