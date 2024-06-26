import dotenv from "dotenv"
import { stationSchema } from "../schemas/index.js"


dotenv.config()

export const fetchStations = async (request, response) => {
    try {
        const stations = await stationSchema.getStations();
        response.json(stations);
    } catch (error) {
        console.error('Error fetching stations:', error);
        response.status(500).send('Server Error');
    }
};