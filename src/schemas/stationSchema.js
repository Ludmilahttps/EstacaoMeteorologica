import Joi from "joi";
import { connection } from "./index.js";
import { querieStation} from "../queries/index.js";

export const stationSchema = Joi.object({
    location: Joi.string().max(100).required(),
    status: Joi.number().integer().min(0).max(1).required(),
    lastCheckUp: Joi.date().required()
});

export const insertStation = () => {
    const query = `--sql
        INSERT INTO public.Station ("location", "status", "lastCheckUp")
        VALUES ($1, $2, $3);
    `;
    return query;
  };
  
  export const getStationById = () => {
    const query = `--sql
        SELECT * FROM public.Station
        WHERE idStation = $1;
    `;
    return query;
  };
  
  export const getStationByCheckUp = () => {
    const query = `--sql
        SELECT * FROM public."Station"
        WHERE lastCheckUp = $1;
    `;
    return query;
  };
  
  export const getStationByStatus = () => {
    const query = `--sql
        SELECT * FROM public."Station"
        WHERE status = $1;
    `;
    return query;
  };
  
  export const updateStationCheckup = () => {
    const query = `--sql
        UPDATE public."Station"
        SET lastCheckUp = $1
        WHERE idStation = $2;
    `;
    return query;
  };
  
  export const updateStationStatus = () => {
    const query = `--sql
        UPDATE public."Station"
        SET status = $1
        WHERE idStation = $2;
    `;
    return query;
  };
  
  export const deleteStation = () => {
    const query = `--sql
        DELETE FROM public."Station"
        WHERE idStation = $1;
    `;
    return query;
  };
