import express from 'express';
import cors from 'cors';
import rotaControleUmidade from './routes/rotaControleUmidade.js';

const app = express();
app.use(cors());
app.use(express.json());

//Rota que busca e retorna a escrita
app.get('/', (req, res) => {
    res.json("API no ar")
})

app.use('controleUmidade', rotaControleUmidade);

const porta = 3001
app.listen (porta, () => {
    console.log(`Servidor iniciado http://localhost:${}`)
})