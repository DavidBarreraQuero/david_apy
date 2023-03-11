CREATE DATABASE futbolAPI;
USE futbolAPI;
CREATE TABLE jugadores (
    id INT PRIMARY KEY,
    nombre VARCHAR(50),
    equipo VARCHAR(50),
    posicion VARCHAR(50) -- delantero, medio, defensa y portero
);
INSERT INTO jugadores VALUES (1, "Jugador 1", "Equipo 1", "portero");
INSERT INTO jugadores VALUES (2, "Jugador 2", "Equipo 1", "delantero");
INSERT INTO jugadores VALUES (3, "Jugador 3", "Equipo 2", "medio");
INSERT INTO jugadores VALUES (4, "Jugador 4", "Equipo 2", "defensa");
INSERT INTO jugadores VALUES (5, "Jugador 5", "Equipo 3", "delantero");
SELECT * FROM jugadores;