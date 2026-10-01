import "dotenv/config";
import express from "express";
import cors from "cors";

import rotaControleUmidade from "./routes/rotaControleUmidade.js";
import rotaControleChuva from "./routes/rotaControleChuva.js";
import rotaMovimento from "./routes/rotaMovimento.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.json({ mensagem: "API da Estufa no ar!" });
});

// Rotas dos sensores
app.use("/controleUmidade", rotaControleUmidade);
app.use("/controleChuva", rotaControleChuva);
app.use("/controleMovimento", rotaMovimento);

// Inicia o servidor quando executado no computador
if (!process.env.VERCEL) {
  const porta = Number(process.env.PORT || 3001);

  app.listen(porta, () => {
    console.log(`Servidor iniciado em http://localhost:${porta}`);
  });
}

// Disponibiliza a aplicação para a Vercel
export default app;