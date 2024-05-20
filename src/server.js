import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/index.js"

dotenv.config()

const server = express()
const { PORT } = process.env || 5008

server.use(cors())
server.use(json())

server.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

server.use(router)

server.listen(PORT, () => console.log(`O server está rodando na porta: ${PORT}`))
