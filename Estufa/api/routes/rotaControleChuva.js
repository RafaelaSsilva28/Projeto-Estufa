import { Router } from "express";
import { BD } from "../services/banco.js";

import {
    buscarMensagens,
    TOPICO_STATUS_CHUVA,
    TOPICO_COBERTURA,
} from "../services/mqttClient.js";

const router = Router();

router.get("/dadosChuva", async (req, res) => {
    res.set("Cache-Control", "no-store");

    try {
        const dados = await buscarMensagens([
            TOPICO_STATUS_CHUVA,
            TOPICO_COBERTURA,
        ]);

        const statusChuva = dados[TOPICO_STATUS_CHUVA];
        const estadoTelhado = dados[TOPICO_COBERTURA];

        const statusNormalizado = statusChuva.trim().toLowerCase();
        const telhadoNormalizado = estadoTelhado.trim().toLowerCase();

        if (
            !["chuvoso", "chovendo", "sem chuva"].includes(
                statusNormalizado
            )
        ) {
            throw new Error("Status de chuva inválido.");
        }

        if (
            !["aberta", "fechada", "aberto", "fechado"].includes(
                telhadoNormalizado
            )
        ) {
            throw new Error("Estado do telhado inválido.");
        }

        const chuvaDetectada = statusNormalizado !== "sem chuva";

        await BD.query(
            `INSERT INTO sensor_chuva (
                chuva_detectada,
                estado_telhado
            ) VALUES ($1, $2)`,
            [chuvaDetectada, estadoTelhado]
        );

        return res.json({
            statusChuva,
            estadoTelhado,
        });
    } catch (error) {
        console.error("Erro ao consultar ou salvar chuva:", error.message);

        return res.status(503).json({
            error: "Não foi possível obter ou salvar os dados de chuva e telhado.",
        });
    }
});

export default router;