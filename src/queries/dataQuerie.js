export const insertDado = () => {
  const query = `--sql
      INSERT INTO public."Dado" (valor, data, unidade_medida, idUser, idSensor)
      VALUES ($1, $2, $3, $4, $5);
  `;
  return query;
};

export const getDadoById = () => {
  const query = `--sql
      SELECT * FROM public."Dado"
      WHERE id_dado = $1;
  `;
  return query;
};

export const getDadoByMedida = () => {
  const query = `--sql
      SELECT * FROM public."Dado"
      WHERE unidade_medida = $1;
  `;
  return query;
};

export const getDadoByData = () => {
  const query = `--sql
      SELECT * FROM public."Dado"
      WHERE data = $1;
  `;
  return query;
};

export const getDadoByValor = () => {
  const query = `--sql
      SELECT * FROM public."Dado"
      WHERE valor = $1;
  `;
  return query;
};

export const updateDado = () => {
  const query = `--sql
      UPDATE public."Dado"
      SET valor = $1, data = $2, unidade_medida = $3, idUser = $4, idSensor = $5
      WHERE id_dado = $6;
  `;
  return query;
};

export const deleteDado = () => {
  const query = `--sql
      DELETE FROM public."Dado"
      WHERE id_dado = $1;
  `;
  return query;
};