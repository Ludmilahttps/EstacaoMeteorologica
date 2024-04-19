export const insertOrder = () => {
  const query = `--sql
          INSERT INTO
              orders ("clientid", "cakeid", "quantity", "employeeid", "createdat")
              SELECT $1, $2, $3, $4, $5
              WHERE EXISTS (SELECT * FROM clients WHERE id_client = $1)
              AND EXISTS (SELECT * FROM cakes WHERE id_cake = $2)
              AND EXISTS (SELECT * FROM employees WHERE id_employee = $4);     
      `
  return query
}

export const selectOrderId = date => {
  const query = `--sql
      SELECT * FROM orders WHERE createdat = ${date}
    `
  return query
}

export const insertSale = () => {
  const query = `--sql
        INSERT INTO
            sale ("orderid", "totalprice")
            SELECT $1, $2;     
    `
  return query
}

export const showOrders = () => {
  const query = `--sql
         
    SELECT
    orders.id_order AS "ordersId",
    orders."createdat",
    orders.quantity,
    cakes.id_cake AS "cakeId",
    cakes.name AS "cakes",
    cakes.price,
    cakes.description,
    cakes.image,
    clients.id_client AS "clientId",
    clients.name AS "clientName",
    clients.cityid AS "adress",
    clients.phone,
    (orders.quantity * cakes.price) AS "totalPrice"
  FROM
    orders
  JOIN
    clients ON orders."clientid" = clients.id_client
  JOIN
    cakes ON orders."cakeid" = cakes.id_cake;
  
  `
  return query
}

export const showSales = () => {
  const query = `--sql
      SELECT
      e.id_employee,
      e.name AS employee_name,
      COUNT(o.id_order) AS total_sales
    FROM
      public.employees e
    LEFT JOIN
      public.orders o ON e.id_employee = o.employeeid
    WHERE
      o.createdat >= NOW() - INTERVAL '1 month'
    GROUP BY
      e.id_employee, e.name
    ORDER BY
      total_sales DESC;

  `
  return query
}

export const showIngredients = () => {
  const query = `--sql
      SELECT
        i.id_ingredient,
        i.name AS ingredient_name,
        SUM(o.quantity) AS total_quantity
    FROM
        public.ingredients i
    JOIN
        public.cake_ingredients ci ON i.id_ingredient = ci.ingredientid
    JOIN
        public.cakes c ON ci.cakeid = c.id_cake
    JOIN
        public.orders o ON c.id_cake = o.cakeid
    WHERE
        o.createdat >= NOW() - INTERVAL '1 month'
    GROUP BY
        i.id_ingredient, i.name
    ORDER BY
        total_quantity DESC;
  `
  return query
}

export const showCity = () => {
  const query = `--sql      
   SELECT
   c.name AS city_name,
   cat.name AS category_name,
   SUM(o.quantity) AS total_cakes_sold
 FROM
   public.orders o
 JOIN
   public.clients cl ON o.clientid = cl.id_client
 JOIN
   public.cities c ON cl.cityid = c.id_city
 JOIN
   public.cakes ca ON o.cakeid = ca.id_cake
 JOIN
   public.categories cat ON ca.categoryid = cat.id_category
 WHERE
   o.createdat >= NOW() - INTERVAL '1 month'
 GROUP BY
   c.name, cat.name
 ORDER BY
   c.name, cat.name;
  `
  return query
}

export const showOrdersQuantity = () => {
  const query = `--sql
      SELECT
      c."name" AS bolo,
      SUM(o.quantity) AS quantidade_total
    FROM
      public.orders o
    JOIN
      public.cakes c ON o.cakeid = c.id_cake
    GROUP BY
      bolo;
  `
  return query
}

export const showOrdersbyId = id => {
  const query = `--sql
  DELETE FROM sale WHERE orderid = ${id};

  -- Exclui os registros da tabela "orders"
  DELETE FROM orders WHERE id_order = ${id};

    `
  return query
}

export const selectClient = id => {
  const query = `--sql
      SELECT * FROM clients WHERE id_client = ${id}
    `
  return query
}

export const selectCake = id => {
  const query = `--sql
      SELECT * FROM cakes WHERE id_cake = ${id}
    `
  return query
}

export const deleteAll = () => {
  const query = `--sql
  DO $$ 
  DECLARE
      table_name_var text;
  BEGIN
      FOR table_name_var IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public') 
      LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || table_name_var || ' CASCADE';
      END LOOP;
  END $$;
`
  return query
}

export const createAll = () => {
  const query = `--sql
      -- DROP TABLE public.categories;
    CREATE TABLE public.categories (
      id_category serial4 NOT NULL,
      "name" varchar(30) NULL,
      CONSTRAINT categories_pkey PRIMARY KEY (id_category)
    );

    -- DROP TABLE public.cities;
    CREATE TABLE public.cities (
      id_city serial4 NOT NULL,
      "name" varchar(50) NOT NULL,
      CONSTRAINT cities_pkey PRIMARY KEY (id_city)
    );

    -- DROP TABLE public.employees;
    CREATE TABLE public.employees (
      id_employee serial4 NOT NULL,
      "name" varchar(30) NULL,
      email varchar(50) NULL,
      "password" varchar(255) NULL,
      CONSTRAINT employees_email_key UNIQUE (email),
      CONSTRAINT employees_pkey PRIMARY KEY (id_employee)
    );

    -- DROP TABLE public.ingredients;
    CREATE TABLE public.ingredients (
      id_ingredient serial4 NOT NULL,
      "name" varchar(50) NULL,
      CONSTRAINT ingredients_pkey PRIMARY KEY (id_ingredient)
    );

    -- DROP TABLE public."position";
    CREATE TABLE public."position" (
      id_position serial4 NOT NULL,
      "name" varchar(50) NULL,
      CONSTRAINT position_pkey PRIMARY KEY (id_position)
    );

    -- DROP TABLE public.cakes;
    CREATE TABLE public.cakes (
      id_cake serial4 NOT NULL,
      "name" varchar(30) NULL,
      price numeric(10) NULL,
      image varchar(120) NULL,
      description text NULL,
      categoryid int4 NULL,
      CONSTRAINT cakes_pkey PRIMARY KEY (id_cake),
      CONSTRAINT cakes_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.categories(id_category)
    );

    -- DROP TABLE public.clients;
    CREATE TABLE public.clients (
      id_client serial4 NOT NULL,
      "name" varchar(30) NULL,
      phone varchar(11) NULL,
      cityid int4 NULL,
      CONSTRAINT clients_pkey PRIMARY KEY (id_client),
      CONSTRAINT clients_cityid_fkey FOREIGN KEY (cityid) REFERENCES public.cities(id_city)
    );

    -- DROP TABLE public.employee_position;
    CREATE TABLE public.employee_position (
      employeeid int4 NOT NULL,
      positionid int4 NOT NULL,
      CONSTRAINT employee_position_pkey PRIMARY KEY (employeeid, positionid),
      CONSTRAINT employee_position_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(id_employee),
      CONSTRAINT employee_position_positionid_fkey FOREIGN KEY (positionid) REFERENCES public."position"(id_position)
    );

    -- DROP TABLE public.orders;
    CREATE TABLE public.orders (
      id_order serial4 NOT NULL,
      cakeid int4 NULL,
      clientid int4 NULL,
      quantity int4 NULL,
      createdat timestamptz NOT NULL,
      employeeid int4 NULL,
      CONSTRAINT orders_pkey PRIMARY KEY (id_order),
      CONSTRAINT orders_cakeid_fkey FOREIGN KEY (cakeid) REFERENCES public.cakes(id_cake),
      CONSTRAINT orders_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.clients(id_client),
      CONSTRAINT orders_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(id_employee)
    );

    -- DROP TABLE public.sale;
    CREATE TABLE public.sale (
      id_sale serial4 NOT NULL,
      orderid int4 NULL,
      totalprice numeric NULL,
      CONSTRAINT sale_pkey PRIMARY KEY (id_sale),
      CONSTRAINT sale_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.orders(id_order)
    );

    -- DROP TABLE public.cake_ingredients;
    CREATE TABLE public.cake_ingredients (
      cakeid int4 NOT NULL,
      ingredientid int4 NOT NULL,
      CONSTRAINT cake_ingredients_pkey PRIMARY KEY (cakeid, ingredientid),
      CONSTRAINT cake_ingredients_cakeid_fkey FOREIGN KEY (cakeid) REFERENCES public.cakes(id_cake),
      CONSTRAINT cake_ingredients_ingredientid_fkey FOREIGN KEY (ingredientid) REFERENCES public.ingredients(id_ingredient)
      );
      `
  return query
}

export const insertAll = () => {
  const query = `
  -- Populando a tabela position
  INSERT INTO public."position" ("name") VALUES
      ('CEO'),
      ('vendedor'),
      ('teste de update');
    
  -- Populando a tabela cities
  INSERT INTO public.cities (name) VALUES
      ('Criciuma'),
      ('Ararangua'),
      ('Sombrio'),
      ('Laguna'),
      ('Tubarao'),
      ('teste de update');
  
  -- Populando a tabela categories
  INSERT INTO public.categories ("name") VALUES
      ('sobremesa'),
      ('bolo simples'),
      ('bolo de festa'),
      ('teste de update');
     
  -- Populando a tabela employees
  INSERT INTO public.employees ("name", email, "password")
  VALUES
      ('João Silva', 'joao.silva@email.com', '$2b$10$u3qjcJ7MT.XOjn0nme5/hO4HD5gboomQ.WscVKJRPJvRGHjxxbqWO'),
      ('Maria Joana', 'maria.joana@email.com', '$2b$10$u3qjcJ7MT.XOjn0nme5/hO4HD5gboomQ.WscVKJRPJvRGHjxxbqWO'),
      ('Laura Dias', 'laura.dias@email.com', '$2b$10$u3qjcJ7MT.XOjn0nme5/hO4HD5gboomQ.WscVKJRPJvRGHjxxbqWO');
  
  -- Populando a tabela clients
  INSERT INTO public.clients ("name", phone, cityid)
  VALUES
      ('Ana Souza', '123456789', 1),
      ('Carlos Lima', '987654321', 2),
      ('Fernanda Costa', '111222333', 3);
  
  -- Populando a tabela employee_position
  INSERT INTO public.employee_position (employeeid, positionid)
  VALUES
      (1, 2),
      (2, 2),
      (3, 2);
  
  -- Populando a tabela cakes
  INSERT INTO public.cakes ("name", price, image, description, categoryid)
  VALUES
      ('Bolo Chocolate', 50.00, 'chocolate.jpg', 'Delicioso bolo de chocolate', 3),
      ('Cupcake Morango', 5.00, 'cupcake.jpg', 'Cupcake sabor morango', 1),
      ('Bolo Casamento', 150.00, 'casamento.jpg', 'Bolo especial para casamentos', 3),
      ('Bolo de Banana', 30.00, 'banana.jpg', 'Bolo de banana', 2);
  
  -- Populando a tabela ingredients
  INSERT INTO public.ingredients ("name")
  VALUES
      ('Chocolate'),
      ('Morango'),
      ('Baunilha'),
      ('Ovo'),
      ('Trigo'),
      ('Leite'),
      ('Fermento'),
      ('Chantilli'),
      ('Banana'),
      ('Leite Condensado'),
      ('Amora'),
      ('Creme de Leite'),
      ('teste de update');
  
  -- Populando a tabela orders
  INSERT INTO public.orders (cakeid, clientid, quantity, createdat, employeeid)
  VALUES
      (3, 1, 2, CURRENT_TIMESTAMP, 1),
      (1, 2, 5, CURRENT_TIMESTAMP, 1),
      (2, 1, 1, CURRENT_TIMESTAMP, 2),
      (1, 2, 1, CURRENT_TIMESTAMP, 3),
      (2, 3, 4, CURRENT_TIMESTAMP, 2),
      (3, 2, 2, CURRENT_TIMESTAMP, 1),
      (4, 1, 3, CURRENT_TIMESTAMP, 1),
      (2, 3, 1, CURRENT_TIMESTAMP, 2),
      (1, 2, 2, CURRENT_TIMESTAMP, 3),
      (2, 1, 4, CURRENT_TIMESTAMP, 2),
      (4, 3, 1, CURRENT_TIMESTAMP, 3);
  
  -- Populando a tabela sale
  INSERT INTO public.sale (orderid, totalprice)
  VALUES
      (1, 100.00),
      (2, 25.00),
      (3, 150.00),
      (4, 50.00),
      (5, 20.00),
      (6, 300.00),
      (7, 90.00),
      (8, 5.00),
      (9, 100.00),
      (10, 20.00),
      (11, 30.00);
  
  -- Populando a tabela cake_ingredients
  INSERT INTO public.cake_ingredients (cakeid, ingredientid)
  VALUES
      (1, 1),
      (1, 4),
      (1, 5),
      (1, 6),
      (1, 7),
      (2, 2),
      (2, 4),
      (2, 5),
      (2, 6),
      (2, 7),
      (2, 11),
      (2, 3),
      (3, 3),
      (3, 4),
      (3, 5),
      (3, 6),
      (3, 7),
      (3, 8),
      (3, 12),
      (4, 9),
      (4, 4),
      (4, 5),
      (4, 6),
      (4, 7);
  `
  return query
}

export const updateAll = () => {
  const query = `--sql
      UPDATE public.categories
    SET "name" = 'Nova Categoria'
    WHERE id_category = 1;

      UPDATE public.cities
    SET "name" = 'Nova Cidade'
    WHERE id_city = 1;

    UPDATE public.employees
    SET "name" = 'Novo Funcionário',
        email = 'novo@email.com',
        "password" = 'nova_senha'
    WHERE id_employee = 1;

    UPDATE public.ingredients
    SET "name" = 'Novo Ingrediente'
    WHERE id_ingredient = 1;

    UPDATE public."position"
    SET "name" = 'Nova Posição'
    WHERE id_position = 3;

    UPDATE public.cakes
    SET "name" = 'Novo Bolo',
        price = 15.99,
        image = 'nova_imagem.jpg',
        description = 'Nova descrição',
        categoryid = 2
    WHERE id_cake = 1;

    UPDATE public.clients
    SET "name" = 'Novo Cliente',
        phone = '987654321',
        cityid = 3
    WHERE id_client = 1;

    UPDATE public.employee_position
    SET positionid = 2
    WHERE employeeid = 1;

    UPDATE public.orders
    SET cakeid = 3,
        clientid = 2,
        quantity = 2,
        createdat = '2023-11-23T10:00:00Z',
        employeeid = 1
    WHERE id_order = 1;

    UPDATE public.sale
    SET orderid = 1,
        totalprice = 25.99
    WHERE id_sale = 1;

    UPDATE public.cake_ingredients
    SET ingredientid = 3
    WHERE cakeid = 1;
`
  return query
}