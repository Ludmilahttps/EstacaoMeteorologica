import dotenv from "dotenv"
import { anemometerSchema } from "../schemas/index.js"

dotenv.config()

export const addData = async (request, response) => {
    const { idStation, windSpeed, windDirection, windAngle } = response.locals.newData;
    const dado = {
        idStation,
        windSpeed,
        windDirection,
        windAngle,
    };
    console.log(dado)
    try {
        await anemometerSchema.insertData(dado)
        console.log(dado)
        return response.status(201).send("anemometer Data registered!")
    } catch (error) {
        return response.status(500).send(`Internal system error.`)
    }
}

export const selectDataAnemometer = async (request, response) => {
    const { startDate, endDate, idStation } = request.query
    try {
        const result = await anemometerSchema.selectDataAnemometer(startDate, endDate, idStation)
        return response.status(200).send(result.rows)
    } catch (error) {
        return response.status(500).send(`Internal system error.`)
    }
}
