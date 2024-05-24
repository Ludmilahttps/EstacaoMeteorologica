export const insertSensor = () => {
  const query = `--sql
      INSERT INTO public."Sensor" (nome_sensor, data_manutencao, idUnidade)
      VALUES ($1, $2, $3);
  `;
  return query;
};

export const getSensorById = () => {
  const query = `--sql
      SELECT * FROM public."Sensor"
      WHERE id_sensor = $1;
  `;
  return query;
};

export const getSensorByUnidade = () => {
  const query = `--sql
      SELECT * FROM public."Sensor"
      WHERE idUnidade = $1;
  `;
  return query;
};

export const getSensorByManutencao = () => {
  const query = `--sql
      SELECT * FROM public."Sensor"
      WHERE data_manutencao = $1;
  `;
  return query;
};


export const updateSensor = () => {
  const query = `--sql
      UPDATE public."Sensor"
      SET nome_sensor = $1, data_manutencao = $2, idUnidade = $3
      WHERE id_sensor = $4;
  `;
  return query;
};

export const deleteSensor = () => {
  const query = `--sql
      DELETE FROM public."Sensor"
      WHERE id_sensor = $1;
  `;
  return query;
};
