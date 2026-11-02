"use strict";

import { 
    crearDatosPersonajes, 
    calcularNuevaPosicion, 
    crearElementosDOM,
    paracaidasPersonaje,
    INTERVALO_MS, 
    altoPersonaje 
} from "./funciones.js";

// --- ELEMENTOS DEL DOM ---
const divPersonajes = document.querySelector("#personajes");
const escenario = document.querySelector("#escenario");
const suelo = document.querySelector("#suelo");
const estrelladoss = document.querySelector("#estrelladoss");
const salvadoss = document.querySelector("#salvados");
const resueltos = document.querySelector("#resueltos");
const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const botonHistorial = document.querySelector("#ver-historial");
const historial = document.querySelector("#historial");
const cerrarHistorial = document.querySelector("#cerrar-historial");

// --- ESTADO DEL JUEGO ---
let personajesEnJuego = [];
let intervaloId = null;
let personajesCompletados = 0;
let salvados = 0;
let estrellados = 0;

// --- GESTIÓN DE MODALES E HISTORIAL ---
if (botonHistorial && historial) {
    botonHistorial.addEventListener("click", () => historial.classList.add("mostrar"));
}

if (cerrarHistorial && historial) {
    cerrarHistorial.addEventListener("click", () => historial.classList.remove("mostrar"));
}

// --- ESCUCHADOR DE PARACAÍDAS ---
if (divPersonajes) {
    divPersonajes.addEventListener("click", (evento) => {
        paracaidasPersonaje(evento, personajesEnJuego);
    });
}

// --- BUCLE PRINCIPAL DE JUEGO ---
function actualizarCaida() {
    if (!escenario || !suelo) return;
    const limiteY = Math.max(0, escenario.clientHeight - suelo.offsetHeight - altoPersonaje);

    for (const personaje of personajesEnJuego) {
        if (personaje.estado === "en-suelo" || personaje.estado === "esperando") continue;

        const llegoAlSuelo = calcularNuevaPosicion(personaje, limiteY);

        if (llegoAlSuelo) {
            if (personaje.elemento) {
                if (personaje.estado === "paracaidas") {
                    personaje.elemento.src = "./img/salvado.gif";
                    salvados++;
                    if (salvadoss) salvadoss.textContent = salvados;
                } else {
                    personaje.elemento.src = "./img/estrellado.gif";
                    estrellados++;
                    if (estrelladoss) estrelladoss.textContent = estrellados;
                    if (estrellados > 2) alert("Game Over");
                }
            }

            personaje.estado = "en-suelo";
            personaje.velocidad = 0;
            personajesCompletados++;

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

    if (personajesCompletados >= personajesEnJuego.length) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}

// --- INICIALIZACIÓN ---
export function iniciarJuego() {
    if (intervaloId !== null) clearInterval(intervaloId);

    salvados = 0;
    estrellados = 0;
    personajesCompletados = 0;

    if (resueltos) resueltos.textContent = salvados;
    if (estrelladoss) estrelladoss.textContent = estrellados;

    personajesEnJuego = crearDatosPersonajes();
    crearElementosDOM(personajesEnJuego);

    intervaloId = setInterval(actualizarCaida, INTERVALO_MS);
}

// --- BOTÓN DE INICIO ---
if (empezar) {
    empezar.addEventListener("click", () => {
        if (panel) {
            panel.classList.remove("mostrar");
            panel.classList.add("oculto");
        }
        iniciarJuego();
    });
}