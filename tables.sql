-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION postgres;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.cakes_id_cake_seq;

CREATE SEQUENCE public.cakes_id_cake_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.cakes_id_cake_seq1;

CREATE SEQUENCE public.cakes_id_cake_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.categories_id_category_seq;

CREATE SEQUENCE public.categories_id_category_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.categories_id_category_seq1;

CREATE SEQUENCE public.categories_id_category_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.cities_id_city_seq;

CREATE SEQUENCE public.cities_id_city_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.clients_id_client_seq;

CREATE SEQUENCE public.clients_id_client_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.clients_id_client_seq1;

CREATE SEQUENCE public.clients_id_client_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.employees_id_employee_seq;

CREATE SEQUENCE public.employees_id_employee_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.employees_id_employee_seq1;

CREATE SEQUENCE public.employees_id_employee_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.employees_id_employee_seq2;

CREATE SEQUENCE public.employees_id_employee_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.ingredients_id_ingredient_seq;

CREATE SEQUENCE public.ingredients_id_ingredient_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.ingredients_id_ingredient_seq1;

CREATE SEQUENCE public.ingredients_id_ingredient_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.orders_id_order_seq;

CREATE SEQUENCE public.orders_id_order_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.orders_id_order_seq1;

CREATE SEQUENCE public.orders_id_order_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.position_id_position_seq;

CREATE SEQUENCE public.position_id_position_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.sale_id_sale_seq;

CREATE SEQUENCE public.sale_id_sale_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.sale_id_sale_seq1;

CREATE SEQUENCE public.sale_id_sale_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id_category serial4 NOT NULL,
	"name" varchar(30) NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (id_category)
);


-- public.cities definition

-- Drop table

-- DROP TABLE public.cities;

CREATE TABLE public.cities (
	id_city serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT cities_pkey PRIMARY KEY (id_city)
);


-- public.employees definition

-- Drop table

-- DROP TABLE public.employees;

CREATE TABLE public.employees (
	id_employee serial4 NOT NULL,
	"name" varchar(30) NULL,
	email varchar(50) NULL,
	"password" varchar(255) NULL,
	CONSTRAINT employees_email_key UNIQUE (email),
	CONSTRAINT employees_pkey PRIMARY KEY (id_employee)
);


-- public.ingredients definition

-- Drop table

-- DROP TABLE public.ingredients;

CREATE TABLE public.ingredients (
	id_ingredient serial4 NOT NULL,
	"name" varchar(50) NULL,
	CONSTRAINT ingredients_pkey PRIMARY KEY (id_ingredient)
);


-- public."position" definition

-- Drop table

-- DROP TABLE public."position";

CREATE TABLE public."position" (
	id_position serial4 NOT NULL,
	"name" varchar(50) NULL,
	CONSTRAINT position_pkey PRIMARY KEY (id_position)
);


-- public.cakes definition

-- Drop table

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


-- public.clients definition

-- Drop table

-- DROP TABLE public.clients;

CREATE TABLE public.clients (
	id_client serial4 NOT NULL,
	"name" varchar(30) NULL,
	phone varchar(11) NULL,
	cityid int4 NULL,
	CONSTRAINT clients_pkey PRIMARY KEY (id_client),
	CONSTRAINT clients_cityid_fkey FOREIGN KEY (cityid) REFERENCES public.cities(id_city)
);


-- public.employee_position definition

-- Drop table

-- DROP TABLE public.employee_position;

CREATE TABLE public.employee_position (
	employeeid int4 NOT NULL,
	positionid int4 NOT NULL,
	CONSTRAINT employee_position_pkey PRIMARY KEY (employeeid, positionid),
	CONSTRAINT employee_position_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(id_employee),
	CONSTRAINT employee_position_positionid_fkey FOREIGN KEY (positionid) REFERENCES public."position"(id_position)
);


-- public.orders definition

-- Drop table

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


-- public.sale definition

-- Drop table

-- DROP TABLE public.sale;

CREATE TABLE public.sale (
	id_sale serial4 NOT NULL,
	orderid int4 NULL,
	totalprice numeric NULL,
	CONSTRAINT sale_pkey PRIMARY KEY (id_sale),
	CONSTRAINT sale_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.orders(id_order)
);


-- public.cake_ingredients definition

-- Drop table

-- DROP TABLE public.cake_ingredients;

CREATE TABLE public.cake_ingredients (
	cakeid int4 NOT NULL,
	ingredientid int4 NOT NULL,
	CONSTRAINT cake_ingredients_pkey PRIMARY KEY (cakeid, ingredientid),
	CONSTRAINT cake_ingredients_cakeid_fkey FOREIGN KEY (cakeid) REFERENCES public.cakes(id_cake),
	CONSTRAINT cake_ingredients_ingredientid_fkey FOREIGN KEY (ingredientid) REFERENCES public.ingredients(id_ingredient)
);