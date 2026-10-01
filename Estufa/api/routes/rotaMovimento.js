import { Router } from "express";
import { BD } from "../services/banco.js";

import {
    buscarMensagens,
    TOPICO_ESTADO_PIR,
} from "../services/mqttClient.js";

const router = Router();

router.get("/movimento", async (req, res) => {
    res.set("Cache-Control", "no-store");

    try {
        const dados = await buscarMensagens([
            TOPICO_ESTADO_PIR,
        ]);

        const presencaDetectada = dados[TOPICO_ESTADO_PIR];

        const statusNormalizado = presencaDetectada
            .trim()
            .toLowerCase();

        if (
            !["presenca detectada", "sem presenca"].includes(
                statusNormalizado
            )
        ) {
            throw new Error("Status de presença inválido.");
        }

        await BD.query(
            `INSERT INTO sensor_pir (
                presenca_detectada
            ) VALUES ($1)`,
            [statusNormalizado === "presenca detectada"]
        );

        return res.json({
            presencaDetectada,
        });
    } catch (error) {
        console.error("Erro ao consultar ou salvar movimento:", error.message);

        return res.status(503).json({
            error: "Não foi possível obter ou salvar os dados de movimento.",
        });
    }
});

export default router;