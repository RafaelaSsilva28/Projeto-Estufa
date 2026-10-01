import { Router } from "express";
import {
    buscarMensagens,
    TOPICO_STATUS_CHUVA,
    TOPICO_COBERTURA,
} from "../services/mqttClient.js";

const router = Router();

router.get("/dadosChuva", async (req, res) => {
    try {
        const dados = await buscarMensagens([
            TOPICO_STATUS_CHUVA,
            TOPICO_COBERTURA,
        ]);

        res.set("Cache-Control", "no-store");

        return res.json({
            statusChuva: dados[TOPICO_STATUS_CHUVA],
            estadoTelhado: dados[TOPICO_COBERTURA],
        });
    } catch (error) {
        console.error("Erro ao buscar chuva:", error.message);

        return res.status(503).json({
            error: "Não foi possível obter os dados de chuva e telhado.",
        });
    }
});

export default router;