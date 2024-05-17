import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 5008;

server.use(cors({
  origin: 'https://estacao-meteorologica-frontend.vercel.app',
  optionsSuccessStatus: 200
}));
server.use(express.json());
server.use(router);

server.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT}`);
});import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/index.js"

dotenv.config()

const server = express()
const { PORT } = process.env || 5008

server.use(cors())
server.use(json())
server.use(router)

server.listen(PORT, () => console.log(`Acesse em http://localhost:${PORT}`))
