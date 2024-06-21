import dotenv from "dotenv"
import { stationSchema } from "../schemas/index.js"

export const getStation = async (request, response) => {
    try {
        const result = await stationSchema.getStation()
        return response.status(200).send(result)
    } catch (error) {
        return response.status(500).send(`Internal system error.`)
    }
    }