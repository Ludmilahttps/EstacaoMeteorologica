export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              Pluviometer ("date", "rainfall", "idStation")
          VALUES
              ($1, $2, $3);        
      `
    return query
  }