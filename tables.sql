-- Recreate the public schema
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public AUTHORIZATION postgres;

COMMENT ON SCHEMA public IS 'standard public schema';

-- Create sequences for auto-increment fields
CREATE SEQUENCE public.dado_id_dado_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;

CREATE SEQUENCE public.sensor_id_sensor_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;

CREATE SEQUENCE public.unidade_id_unidade_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;

-- Create tables
CREATE TABLE public."User" 
(
    matricula VARCHAR(8) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo INT NOT NULL DEFAULT 1,
    senha VARCHAR(255) NOT NULL,
    CHECK (tipo BETWEEN 0 AND 2)
);

CREATE TABLE public."Dado" 
(
    id_dado INT PRIMARY KEY DEFAULT nextval('public.dado_id_dado_seq'),
    valor FLOAT NOT NULL,
    data DATE NOT NULL,
    unidade_medida VARCHAR(50) NOT NULL,
    idUser VARCHAR(8) NOT NULL,
    idSensor INT NOT NULL,
    CONSTRAINT dado_user_fkey FOREIGN KEY (idUser) REFERENCES public."User" (matricula),
    CONSTRAINT dado_sensor_fkey FOREIGN KEY (idSensor) REFERENCES public."Sensor" (id_sensor)
);

CREATE TABLE public."Sensor" 
(
    id_sensor INT PRIMARY KEY DEFAULT nextval('public.sensor_id_sensor_seq'),
    nome_sensor VARCHAR(100) NOT NULL,
    data_manutencao DATE,
    idUnidade INT,
    CONSTRAINT sensor_unidade_fkey FOREIGN KEY (idUnidade) REFERENCES public."Unidade" (id_unidade)
);

CREATE TABLE public."Unidade" 
(
    id_unidade INT PRIMARY KEY DEFAULT nextval('public.unidade_id_unidade_seq'),
    localidade VARCHAR(100) NOT NULL,
    estado INT NOT NULL DEFAULT 0,
    data_manutencao DATE,
    CHECK (estado BETWEEN 0 AND 1)
);
