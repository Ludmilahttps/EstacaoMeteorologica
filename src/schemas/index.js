import pg from "pg"
import dotenv from "dotenv"

dotenv.config()
const { Pool } = pg

const databaseConfig = {
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const connection = new Pool(databaseConfig)

export { connection }
export * as stationSchema from "./stationSchema.js"
export * as dataSchema from "./dataSchema.js"
export * as sensorSchema from "./sensorSchema.js"
export * as authSchema from "./authSchema.js"
//export * as pluviometerSchema from "./pluviometerSchema.js"
export * as dhtSchema from "./dhtSchema.js"
export * as queries from "../queries/index.js"