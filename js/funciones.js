"use strict";


const cantidadPersonajes = 50;
const gravedad = 900;
const velocidadConParacaidas = 110;
const altoPersonaje = 80;

const FPS = 60;
const INTERVALO_MS = 2000 / FPS; // 1000ms / 60fps ≈ 16.6ms
const DELTA_SEGUNDOS = 1 / FPS;


let personajesEnJuego = [];
let intervaloId = null;
let personajesCompletados = 0;
let salvados = 0;
let estrellados = 0;


const divPersonajes = document.querySelector("#personajes");
const escenario = document.querySelector("#escenario");
const suelo = document.querySelector("#suelo");
const estrelladoss = document.querySelector("#estrelladoss");
const resueltos = document.querySelector("#resueltos");
const empezar = document.querySelector("#iniciar");
const botonHistorial = document.querySelector("#ver-historial");
const historial = document.querySelector("#historial");
const cerrarHistorial = document.querySelector("#cerrar-historial");
const salvadoss = document.querySelector("#salvados")


if (botonHistorial && historial) {
    botonHistorial.addEventListener("click", function () {
        historial.classList.add("mostrar");
    });
}

if (cerrarHistorial && historial) {
    cerrarHistorial.addEventListener("click", function () {
        historial.classList.remove("mostrar");
    });
}


export function objPersonajes() {
    const anchoDisponible = Math.max(0, (escenario?.clientWidth || 0) - 64);
    return Array.from({ length: cantidadPersonajes }, (_, id) => ({
        id,
        x: Math.random() * anchoDisponible,
        y: 0,
        velocidad: 0,
        estado: id === 0 ? "cayendo" : "esperando",
        elemento: null
    }));
}

export function crearElementosDOM() {
    if (!divPersonajes) return;


    divPersonajes.innerHTML = personajesEnJuego.map((personaje) => `
        <img
            class="personaje"
            data-id="${personaje.id}"
            src="./img/cayendo.gif"
            style="position: absolute; left: ${personaje.x}px; top: ${personaje.y}px; ${personaje.estado === "esperando" ? "display: none;" : ""}"
        >
    `).join("");


    personajesEnJuego.forEach((personaje, index) => {
        personaje.elemento = divPersonajes.children[index];
    });
}


function actualizarCaida() {
    if (!escenario || !suelo) return;
    const limiteY = Math.max(0, escenario.clientHeight - suelo.offsetHeight - altoPersonaje);

    for (const personaje of personajesEnJuego) {
        if (personaje.estado === "en-suelo" || personaje.estado === "esperando") continue;

        if (personaje.estado === "cayendo") {
            personaje.velocidad += gravedad * DELTA_SEGUNDOS;
        } else if (personaje.estado === "paracaidas") {
            personaje.velocidad = Math.min(
                personaje.velocidad + gravedad * DELTA_SEGUNDOS,
                velocidadConParacaidas
            );
        }

        personaje.y = Math.min(limiteY, personaje.y + personaje.velocidad * DELTA_SEGUNDOS);

        let timer = null;
        if (personaje.y >= limiteY) {
            if (personaje.elemento) {
                if (personaje.estado === "paracaidas") {
                    personaje.elemento.src = "./img/salvado.gif";
                    salvados++;
                    if (salvadoss) salvadoss.textContent = salvados;
                } else {
                    personaje.elemento.src = "./img/estrellado.gif";
                    estrellados++;
                    if (estrelladoss) estrelladoss.textContent = estrellados;
                    if(estrellados == 3){
                        alert("Game Over");
                    }
                }
            }
            personaje.estado = "en-suelo";
            personaje.velocidad = 0;
            personajesCompletados++;

            // Activar al siguiente personaje
            const siguiente = personajesEnJuego.find((p) => p.estado === "esperando");
            if (siguiente) {
                siguiente.estado = "cayendo";
                if (siguiente.elemento) siguiente.elemento.style.display = "block";
            }
        }

        if (personaje.elemento) {
            personaje.elemento.style.top = `${personaje.y}px`;
        }
    }

    // Comprobar fin de juego
    if (personajesCompletados >= personajesEnJuego.length) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}


export function paracaidasPersonaje(evento) {
    const elemento = evento.target.closest(".personaje");
    if (!elemento) return;

    const id = Number(elemento.dataset.id);
    const personaje = personajesEnJuego.find((item) => item.id === id);

    if (!personaje || personaje.estado !== "cayendo") return;

    personaje.estado = "paracaidas";
    personaje.velocidad = Math.min(personaje.velocidad, velocidadConParacaidas);
    if (personaje.elemento) personaje.elemento.src = "./img/paracaidas.gif";
}



export function iniciarJuego() {
    if (intervaloId !== null) clearInterval(intervaloId);

    salvados = 0;
    estrellados = 0;
    personajesCompletados = 0;

    if (resueltos) resueltos.textContent = salvados;
    if (estrelladoss) estrelladoss.textContent = estrellados;

    personajesEnJuego = objPersonajes();
    crearElementosDOM();

    intervaloId = setInterval(actualizarCaida, INTERVALO_MS);
}


if (divPersonajes) {
    divPersonajes.addEventListener("click", paracaidasPersonaje);
}

if (empezar) {
    empezar.addEventListener("click", iniciarJuego);
}