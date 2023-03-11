# Importar las librerías principales
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from JGVutils import MySQLConnection

# Configuración principal de la API, creación de las CORS, y conexión con la base de datos
application = Flask(__name__)
cors = CORS(application)
conexion = MySQLConnection(host="localhost", port=3306, dbname="futbolapi")

@application.route("/")
def indice_contenidos():
    # Renderiza en la página principal el archivo index.html que es el front
    return render_template("index.html")

@application.route("/getJugadores/", methods=["GET"])
def getJugadores():
    # Comprueba si existe conexión con la base de datos
    if conexion.is_database_connection():
        # Captura todos los jugadores y los devuelve
        return conexion.execute_query("SELECT * FROM jugadores")
    else:
        # Devuelve un mensaje de error
        return {"mensaje":"error"}

@application.route("/getJugador/<id>", methods=["GET"])
def getJugador(id):
    # Comprueba si existe conexión con la base de datos
    if conexion.is_database_connection():
        # En caso de existir, devolverá el resultado de hacer una query con filtro sobre la base de datos
        filas = conexion.execute_query("SELECT * FROM jugadores WHERE id = %s", [id])
        try:
            # Intenta capturar un posible valor
            nombre = filas[0]["nombre"]
            return filas
        except:
            return {"mensaje":"Jugador no encontrado"}
    else:
        # Devuelve un mensaje de error
        return {"mensaje":"error"}

@application.route("/insertarJugador/", methods=["POST"])
def insertarJugador():
    # Obtiene los datos JSON
    datos = request.get_json()
    try:
        # Datos a insertar (id, nombre, equipo, posicion)
        id = datos["id"]
        nombre = datos["nombre"]
        equipo = datos["equipo"]
        posicion = datos["posicion"]

        # Ejecuta la query para insertar los datos
        filas = conexion.execute_query("INSERT INTO jugadores VALUES (%s, %s, %s, %s)", [id, nombre, equipo, posicion])

        # Si no existen filas, el jugador no se añade porque ya existe
        if filas is None:
            return {"mensaje":"Jugador no añadido porque ya existe"}
        else:
            return {"mensaje":"Jugador añadido"}
    except:
        # Mensaje en caso de error
        return {"mensaje":"Error intentando crear un jugador"}

@application.route("/modificarJugador/", methods=["PUT"])
def modificarJugador():
    # Obtiene un id y un nombre nuevo del cuerpo JSON
    datos = request.get_json()
    try:
        # Captura los datos del JSON obtenido
        id = datos["id"]
        nuevoNombre = datos["nombreNuevo"]

        # Comprueba si existe conexión
        if conexion.is_database_connection():
            # Ejecuta una query de actualización
            conexion.execute_query("UPDATE jugadores SET nombre = %s WHERE id = %s", [nuevoNombre, id])
            return {"mensaje":"Jugador modificado"}
        else:
            return {"mensaje":"Error intentando modificar el nombre de un jugador"}
    except:
        return {"mensaje":"Error intentando modificar el nombre de un jugador"}


@application.route("/eliminarJugador/", methods=["DELETE"])
def eliminarJugador():
    # Obtiene los datos del id del jugador para eliminar
    datos = request.get_json()

    # Intenta eliminar el jugador
    try:
        # Captura el id, ejecuta una query, verificando antes si existe conexión con la base de datos
        id = datos["id"]
        if conexion.is_database_connection():
            conexion.execute_query("DELETE FROM jugadores WHERE id = %s", [id])
            return {"mensaje":"Jugador eliminado"}
        else:
            # Si no existe conexión con la base de datos, elimina el jugador
            return {"mensaje":"Error intentando eliminar un jugador"}
    except:
        return {"mensaje":"Error intentando eliminar un jugador"}