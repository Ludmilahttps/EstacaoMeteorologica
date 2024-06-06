export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              Pluviometer ("date", "rainfall")
          VALUES
              ($1, $2, '0');        
      `
    return query
  }