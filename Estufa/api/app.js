import express from 'express';
import cors from 'cors';
import rotaControleUmidade from './routes/rotaControleUmidade.js';
import rotaControleChuva from './routes/rotaControleChuva.js';
import rotaMovimento from './routes/rotaMovimento.js';
import rotaControleAcesso from './routes/rotaControleAcesso.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota principal da API
app.get('/', (req, res) => {
    res.json("API no ar");
});

// Rotas de controle de umidade
app.use('/controleUmidade', rotaControleUmidade);
app.use('/controleChuva', rotaControleChuva);
app.use('/controleMovimento', rotaMovimento);
app.use('/controleAcesso', rotaControleAcesso);

const porta = 3001;

app.listen(porta, () => {
    console.log(`Servidor iniciado em http://localhost:${porta}`);
});