export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              dht ("data", "temperatura", "umidade")
          VALUES
              ($1, $2, $3);        
      `
    return query
  }