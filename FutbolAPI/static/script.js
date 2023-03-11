let tablaJugadores;

window.onload = function(){
    tablaJugadores = document.querySelector("#tablaJugadores");
    cargarTablaJugadores();
}

function buscarJugador(idJugador, boton){
    if(idJugador != ""){
        boton.disabled = true;
        RequestSend.GET({
            url: "http://127.0.0.1:5000/getJugador/"+ idJugador,
            callback: function(jugador){
                if(jugador["mensaje"]){
                    alert(jugador["mensaje"]);
                } else {
                    let id = jugador[0]["id"];
                    let nombre = jugador[0]["nombre"];
                    let equipo = jugador[0]["equipo"];
                    let posicion = jugador[0]["posicion"];
                    alert(`¡Jugador encontrado!\n\nID: ${id}\nNOMBRE: ${nombre}\nEQUIPO: ${equipo}\nPOSICIÓN: ${posicion}`);
                };
                boton.disabled = false;
            }
        });
    } else {
        alert("Aporta al menos un dato");
    }
    
}

function crearJugador(id, nombre, equipo, posicion, boton){
    if(id == "" || nombre ==  "" || equipo == "" || posicion == ""){
        alert("Faltan datos por aportar");
    } else {
        boton.disabled = true;
        RequestSend.POST({
            url: "http://127.0.0.1:5000/insertarJugador/",
            body: {id: id, nombre: nombre, equipo: equipo, posicion: posicion},
            callback: function(datos){
                alert(datos.mensaje)
                cargarTablaJugadores();
                boton.disabled = false;
            }
        });
    }
}


function cargarTablaJugadores(){
    RequestSend.GET({
        url: "http://127.0.0.1:5000/getJugadores/",
        callback: function(jugadores){
            let resultado = null;
            if(jugadores["mensaje"]){
                resultado = "No hay conexión con la base de datos";
            } else {
                resultado = "<tr><th>ID</th><th>Nombre</th><th>Equipo</th><th>Posición</th></tr>";
                jugadores.forEach((jugador) => {
                    resultado += `<tr><td>${jugador.id}</td><td>${jugador.nombre}</td><td>${jugador.equipo}</td><td>${jugador.posicion}</td></tr>`;
                });
            };
            tablaJugadores.innerHTML = resultado;
        }
    });
}

function eliminarJugador(idJugador, boton){
    if(idJugador.value == ""){
        alert("Faltan datos por aportar");
    } else {
        boton.disabled = true;
        RequestSend.DELETE({
            url: "http://127.0.0.1:5000/eliminarJugador/",
            body: {id: idJugador},
            callback: function(datos){
                alert(datos.mensaje)
                cargarTablaJugadores();
                boton.disabled = false;
            }
        });
    }
}

function modificarJugador(idJugador, nombreNuevo, boton){
    if(idJugador.value == "" || nombreNuevo == ""){
        alert("Faltan datos por aportar");
    } else {
        boton.disabled = true;
        RequestSend.PUT({
            url: "http://127.0.0.1:5000/modificarJugador/",
            body: {id: idJugador, nombreNuevo:nombreNuevo},
            callback: function(datos){
                alert(datos.mensaje)
                cargarTablaJugadores();
                boton.disabled = false;
            }
        });
    }
}