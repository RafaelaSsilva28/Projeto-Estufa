// Recebe e salva a leitura do RFID

import { Router } from "express";
import { BD } from "../services/banco.js";

const router = Router();

router.post("/leitura", async (req, res) => {
    const { uid } = req.body ?? {};

    if (typeof uid !== "string" || !uid.trim()) {
        return res.status(400).json({
            mensagem: "UID não foi informado!",
        });
    }

    try {
        await BD.query(
            `INSERT INTO leitor_rfid (nome, codigo_rfid)
             VALUES ($1, $2)`,
            ["Cartão RFID", uid.trim()]
        );

        console.log(`Tag lida: ${uid}`);

        return res.status(201).json({
            mensagem: "Cartão capturado e salvo com sucesso",
            uid: uid.trim(),
        });
    } catch (error) {
        console.error("Erro ao salvar RFID:", error.message);

        return res.status(503).json({
            mensagem: "Não foi possível salvar o cartão.",
        });
    }
});

export default router;