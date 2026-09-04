-- Documento SQL criação do banco de dados
-- PROJETO: Estufa 3B

CREATE TABLE leitor_rfid(
   id_leitor_rfid SERIAL PRIMARY KEY,
   nome VARCHAR(100) NOT NULL,
   codigo_rfid VARCHAR(100) NOT NULL,
   data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensor_dht(
   id_sensor_dht SERIAL PRIMARY KEY,
   status_umidade VARCHAR(100) NOT NULL,
   status_temperatura VARCHAR(100) NOT NULL,
   data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensor_chuva(
  id_sensor_chuva SERIAL PRIMARY KEY,
  chuva_detectada BOOLEAN DEFAULT false,
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM leitor_rfid;
SELECT * FROM sensor_dht;
SELECT * FROM sensor_chuva;

