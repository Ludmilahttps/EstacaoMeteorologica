import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

console.log("Database Config:", databaseConfig);  // Verifica se a configuração está correta

const connection = new Pool(databaseConfig);

connection.on('connect', () => {
  console.log('Connected to the database');
});

connection.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { connection };
export * as stationSchema from "./stationSchema.js";
export * as authSchema from "./authSchema.js";
export * as pluviometerSchema from "./pluviometerSchema.js";
export * as anemometerSchema from "./anemometerSchema.js";
export * as dhtSchema from "./dhtSchema.js";
export * as bmpSchema from "./bmpSchema.js";
export * as queries from "../queries/index.js";



// import pg from "pg"
// import dotenv from "dotenv"

// dotenv.config()
// const { Pool } = pg

// const databaseConfig = {
//   connectionString: process.env.POSTGRES_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// }

// const connection = new Pool(databaseConfig)

// export { connection }
// export * as stationSchema from "./stationSchema.js"
// export * as authSchema from "./authSchema.js"
// export * as pluviometerSchema from "./pluviometerSchema.js"
// export * as anemometerSchema from "./anemometerSchema.js"
// export * as dhtSchema from "./dhtSchema.js"
// export * as bmpSchema from "./bmpSchema.js"
// export * as queries from "../queries/index.js"