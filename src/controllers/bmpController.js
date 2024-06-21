import dotenv from 'dotenv';
import { bmpSchema } from '../schemas/index.js';

dotenv.config();

export const addData = async (request, response) => {
  const { idStation, pressure, temperature, altitude } = response.locals.newData;
  const dado = {
    idStation,
    pressure,
    temperature,
    altitude,
  };
  
  console.log(dado);

  try {
    await bmpSchema.insertData(dado); 
    console.log(dado);
    return response.status(201).send("BMP Data registered!");
  } catch (error) {
    console.error(error);
    return response.status(500).send("Internal system error.");
  }
};

export const selectDataBMP280 = async (request, response) => {
  const { startDate, endDate, idStation } = request.query;

  try {
    const result = await bmpSchema.selectDataBMP280(startDate, endDate, idStation);
    return response.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    return response.status(500).send("Internal system error.");
  }
}

// export async function getClientsOrders(request, response) {
//   const {id} = request.params

//   try {
//   const ordersByClient = await clientSchema.getOrdersByClientId(Number(id))
//   response.send(ordersByClient.rows)
  
//   } catch (error) {
//       console.log(error)
//       response.sendStatus(error)
//   }
// }
