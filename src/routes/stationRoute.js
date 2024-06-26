import { Router } from "express";
import { stationController } from "../controllers/index.js";

const stationRoute = Router();

stationRoute.get(
    "/stations",
    stationController.fetchStations
    );

export { stationRoute }