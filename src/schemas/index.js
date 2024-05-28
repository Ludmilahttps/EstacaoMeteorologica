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
export * as clientSchema from "./clientSchema.js"
export * as cakeSchema from "./cakeSchema.js"
export * as orderSchema from "./orderSchema.js"
export * as authSchema from "./authSchema.js"
//export * as pluviometerSchema from "./pluviometerSchema.js"
export * as dhtSchema from "./dhtSchema.js"
export * as queries from "../queries/index.js"