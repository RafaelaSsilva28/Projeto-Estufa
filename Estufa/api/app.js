import "dotenv/config";
import express from "express";
import cors from "cors";

import rotaControleUmidade from "./routes/rotaControleUmidade.js";
import rotaControleChuva from "./routes/rotaControleChuva.js";
import rotaMovimento from "./routes/rotaMovimento.js";
import rotaAcesso from "./routes/rotaControleAcesso.js";
import rotaHistorico from "./routes/rotaHistorico.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
    res.json({
        mensagem: "API da Estufa no ar!",
    });
});

// Rotas dos sensores
app.use("/controleUmidade", rotaControleUmidade);
app.use("/controleChuva", rotaControleChuva);
app.use("/controleMovimento", rotaMovimento);

// Rota de acesso RFID
app.use("/acesso", rotaAcesso);

// Histórico salvo no Neon
app.use("/historico", rotaHistorico);

// Inicia o servidor no computador
if (!process.env.VERCEL) {
    const porta = Number(process.env.PORT || 3001);

    app.listen(porta, () => {
        console.log(`Servidor iniciado em http://localhost:${porta}`);
    });
}

export default app;