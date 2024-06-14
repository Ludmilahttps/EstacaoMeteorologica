export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              public."Pluviometer" ("date", "rainfall", "idstation")
          VALUES
              ($1, $2, $3);        
      `
    return query
  }