import { Router } from "express";
import { BD } from "../services/banco.js";

import {
    buscarMensagens,
    TOPICO_UMIDADE,
    TOPICO_TEMPERATURA,
} from "../services/mqttClient.js";

const router = Router();

router.get("/dadosClima", async (req, res) => {
    res.set("Cache-Control", "no-store");

    try {
        const dados = await buscarMensagens([
            TOPICO_TEMPERATURA,
            TOPICO_UMIDADE,
        ]);

        const temperatura = dados[TOPICO_TEMPERATURA];
        const umidade = dados[TOPICO_UMIDADE];

        if (
            !temperatura?.trim() ||
            !umidade?.trim() ||
            !Number.isFinite(Number(temperatura)) ||
            !Number.isFinite(Number(umidade))
        ) {
            throw new Error("Valores de temperatura ou umidade inválidos.");
        }

        await BD.query(
            `INSERT INTO sensor_dht (
                status_umidade,
                status_temperatura
            ) VALUES ($1, $2)`,
            [umidade, temperatura]
        );

        return res.json({
            temperatura,
            umidade,
        });
    } catch (error) {
        console.error("Erro ao consultar ou salvar clima:", error.message);

        return res.status(503).json({
            error: "Não foi possível obter ou salvar temperatura e umidade.",
        });
    }
});

export default router;