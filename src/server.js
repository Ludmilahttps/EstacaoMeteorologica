import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import { Pool } from "pg";

dotenv.config();

const server = express();
const { PORT, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  password: POSTGRES_PASSWORD,
  port: 5432, // Porta padrão do PostgreSQL
});

server.use(cors());
server.use(json());
server.use(router);

server.listen(PORT, () => console.log(`Acesse em http://localhost:${PORT}`));
