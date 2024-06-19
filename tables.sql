-- Recreate the public schema
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public AUTHORIZATION postgres;

COMMENT ON SCHEMA public IS 'standard public schema';


-- Create tables
CREATE TABLE public."User" 
(
    cpf VARCHAR(11) PRIMARY KEY,
    email VARCHAR(50) NOT NULL
    "name" VARCHAR(50) NOT NULL,
    position INT NOT NULL DEFAULT 1,
    "password" VARCHAR(255) NOT NULL,
    CHECK (position BETWEEN 0 AND 3)
);

CREATE TABLE public."Station" 
(
    idStation serial4 INT PRIMARY KEY DEFAULT,
    "location" VARCHAR(100) NOT NULL,
    "status" INT NOT NULL DEFAULT 1,
    lastCheckUp DATE,
    CHECK ("status" BETWEEN 0 AND 1)
);

CREATE TABLE public."DHT11" 
(
	idDHT11 serial4 INT PRIMARY KEY,
	'date' DATE NOT NULL,
	temperature FLOAT NOT NULL,
	humidity FLOAT NOT NULL,
	idStation INT NOT NULL,
	CONSTRAINT dht11_station_fkey FOREIGN KEY (idStation) REFERENCES public."Station" (idStation)
);

CREATE TABLE public."Pluviometer" 
(
	idPluviometer serial4 INT PRIMARY KEY DEFAULT,
	'date' DATE NOT NULL,
	rainfall FLOAT NOT NULL,
	idStation INT NOT NULL,
	CONSTRAINT pluviometer_station_fkey FOREIGN KEY (idStation) REFERENCES public."Station" (idStation)
);

CREATE TABLE public."BMP280"
(
	idBMP280 serial4 INT PRIMARY KEY,
	'date' DATE NOT NULL,
	pressure FLOAT NOT NULL,
	temperature FLOAT NOT NULL,
	altitude FLOAT NOT NULL,
	idStation INT NOT NULL,
	CONSTRAINT bmp280_station_fkey FOREIGN KEY (idStation) REFERENCES public."Station" (idStation)
);

CREATE TABLE public."Anemometer"
(
	idAnemometer serial4 INT PRIMARY KEY,
	'date' DATE NOT NULL,
	windSpeed FLOAT NOT NULL,
	windDirection VARCHAR(10) NOT NULL,
	windAngle FLOAT NOT NULL,
	idStation INT NOT NULL,
	CONSTRAINT anemometer_station_fkey FOREIGN KEY (idStation) REFERENCES public."Station" (idStation)
);
