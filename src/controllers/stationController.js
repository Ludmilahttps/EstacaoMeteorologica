import dotenv from "dotenv"
import { stationSchema } from "../schemas/index.js"


export const fetchStations = async (req, res) => {
    try {
        const stations = await stationSchema.getStations();
        res.json(stations);
    } catch (error) {
        console.error('Error fetching stations:', error);
        res.status(500).send('Server Error');
    }
};