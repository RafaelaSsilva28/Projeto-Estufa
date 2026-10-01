import { Router } from "express";
import { BD } from "../services/banco.js";

const router = Router();

// Consultas fixas para cada sensor
const consultas = {
    clima: `
        SELECT
            id_sensor_dht AS id,
            'clima' AS sensor,
            data_hora,
            json_build_object(
                'temperatura', status_temperatura,
                'umidade', status_umidade
            ) AS dados
        FROM sensor_dht
    `,

    chuva: `
        SELECT
            id_sensor_chuva AS id,
            'chuva' AS sensor,
            data_hora,
            json_build_object(
                'chuvaDetectada', chuva_detectada,
                'estadoTelhado', estado_telhado
            ) AS dados
        FROM sensor_chuva
    `,

    presenca: `
        SELECT
            id_sensor_pir AS id,
            'presenca' AS sensor,
            data_hora,
            json_build_object(
                'presencaDetectada', presenca_detectada
            ) AS dados
        FROM sensor_pir
    `,

    rfid: `
        SELECT
            id_leitor_rfid AS id,
            'rfid' AS sensor,
            data_hora,
            json_build_object(
                'nome', nome,
                'uid', codigo_rfid
            ) AS dados
        FROM leitor_rfid
    `,
};

router.get("/", async (req, res) => {
    const sensor = req.query.sensor ?? "todos";

    if (
        typeof sensor !== "string" ||
        (sensor !== "todos" &&
            !Object.hasOwn(consultas, sensor))
    ) {
        return res.status(400).json({
            error: "Sensor inválido. Use todos, clima, chuva, presenca ou rfid.",
        });
    }

    try {
        const consulta =
            sensor === "todos"
                ? Object.values(consultas).join(" UNION ALL ")
                : consultas[sensor];

        const resultado = await BD.query(`
            SELECT *
            FROM (${consulta}) AS historico
            ORDER BY data_hora DESC, sensor, id DESC
            LIMIT 200
        `);

        res.set("Cache-Control", "no-store");

        return res.json(resultado.rows);
    } catch (error) {
        console.error("Erro ao consultar histórico:", error.message);

        return res.status(503).json({
            error: "Não foi possível consultar o histórico.",
        });
    }
});

export default router;