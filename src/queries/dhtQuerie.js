export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              DHT11 ("date", "temperature", "humidity", "idStation")
          VALUES
              ($1, $2, $3, $4);        
      `
    return query
  }