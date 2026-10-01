import { Router } from "express";
import {
    buscarMensagens,
    TOPICO_UMIDADE,
    TOPICO_TEMPERATURA,
} from "../services/mqttClient.js";

const router = Router();

router.get("/dadosClima", async (req, res) => {
    try {
        const dados = await buscarMensagens([TOPICO_TEMPERATURA, TOPICO_UMIDADE]);

        res.set("Cache-Control", "no-store");

        return res.json({
            temperatura: dados[TOPICO_TEMPERATURA],
            umidade: dados[TOPICO_UMIDADE],
        });
    } catch (error) {
        console.error("Erro ao buscar clima:", error.message);

        return res.status(503).json({
            error: "Não foi possível obter temperatura e umidade.",
        });
    }
});

export default router;
