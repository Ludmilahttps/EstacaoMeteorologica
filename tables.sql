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
    CHECK (position BETWEEN 0 AND 2)
);

CREATE TABLE public."Station" 
(
    idStation serial4 INT PRIMARY KEY DEFAULT,
    "location" VARCHAR(100) NOT NULL,
    "status" INT NOT NULL DEFAULT 1,
    lastCheckUp DATE,
    CHECK ("status" BETWEEN 0 AND 1)
);

CREATE TABLE public."Sensor" 
(
    idSensor serial4 INT PRIMARY KEY DEFAULT,
    sensorName VARCHAR(100) NOT NULL,
    lastCheckUp DATE,
    idStation INT,
    CONSTRAINT sensor_station_fkey FOREIGN KEY (idStation) REFERENCES public."Station" (idStation)
);

CREATE TABLE public."DHT11" 
(
	idDHT11 serial4 INT PRIMARY KEY,
	'date' DATE NOT NULL,
	temperature FLOAT NOT NULL,
	humidity FLOAT NOT NULL,
	idSensor INT NOT NULL,
	CONSTRAINT dht11_sensor_fkey FOREIGN KEY (idSensor) REFERENCES public."Sensor" (idSensor)
);

CREATE TABLE public."Pluviometer" 
(
	idPluviometer serial4 INT PRIMARY KEY DEFAULT,
	'date' DATE NOT NULL,
	rainfall FLOAT NOT NULL,
	idSensor INT NOT NULL,
	CONSTRAINT pluviometer_sensor_fkey FOREIGN KEY (idSensor) REFERENCES public."Sensor" (idSensor)
);

CREATE TABLE public."BMP280"
(
	idBMP280 serial4 INT PRIMARY KEY,
	'date' DATE NOT NULL,
	pressure FLOAT NOT NULL,
	temperature FLOAT NOT NULL,
	altitude FLOAT NOT NULL,
	idSensor INT NOT NULL,
	CONSTRAINT bmp280_sensor_fkey FOREIGN KEY (idSensor) REFERENCES public."Sensor" (idSensor)
);

CREATE TABLE public."Anemometer"
(
	idAnemometer serial4 INT PRIMARY KEY,
	'date' DATE NOT NULL,
	windSpeed FLOAT NOT NULL,
	windDirection FLOAT NOT NULL,
	idSensor INT NOT NULL,
	CONSTRAINT anemometer_sensor_fkey FOREIGN KEY (idSensor) REFERENCES public."Sensor" (idSensor)
);
