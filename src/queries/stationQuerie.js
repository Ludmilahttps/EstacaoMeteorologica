export const insertStation = () => {
  const query = `--sql
      INSERT INTO public.Station ("location", "status" , "lastCheckUp")
      VALUES ($1, '1', $3);
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

export const getStation = () => {
  const query = `--sql
      SELECT idStation, "location" FROM public."Station";
  `;
  return query;
}

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
      WHERE idstation = $1;
  `;
  return query;
};