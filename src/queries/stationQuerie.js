export const insertUnidade = () => {
  const query = `--sql
      INSERT INTO public."Unidade" (localidade, estado, data_manutencao)
      VALUES ($1, $2, $3);
  `;
  return query;
};

export const getUnidadeById = () => {
  const query = `--sql
      SELECT * FROM public."Unidade"
      WHERE id_unidade = $1;
  `;
  return query;
};

export const getUnidadeByManutencao = () => {
  const query = `--sql
      SELECT * FROM public."Unidade"
      WHERE data_manutencao = $1;
  `;
  return query;
};

export const getUnidadeByEstado = () => {
  const query = `--sql
      SELECT * FROM public."Unidade"
      WHERE estado = $1;
  `;
  return query;
};


export const updateUnidade = () => {
  const query = `--sql
      UPDATE public."Unidade"
      SET localidade = $1, estado = $2, data_manutencao = $3
      WHERE id_unidade = $4;
  `;
  return query;
};

export const deleteUnidade = () => {
  const query = `--sql
      DELETE FROM public."Unidade"
      WHERE id_unidade = $1;
  `;
  return query;
};