import { 
    crearDatosPersonajes, 
    calcularNuevaPosicion, 
    INTERVALO_MS, 
    altoPersonaje 
} from "./fisicas.js";
import { crearElementosDOM } from "./personajesDOM.js";


// DOM
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


// ESTADO
let personajesEnJuego = [];
let intervaloId = null;
let personajesCompletados = 0;
let salvados = 0;
let estrellados = 0;


// --- MODALES E HISTORIAL ---
if (botonHistorial && historial) {
    botonHistorial.addEventListener("click", () => historial.classList.add("mostrar"));
}


if (cerrarHistorial && historial) {
    cerrarHistorial.addEventListener("click", () => historial.classList.remove("mostrar"));
}


// --- BUCLE Y ESTADOS DEL JUEGO ---
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
            personaje.elemento.style.top = ${personaje.y}px;
        }
    }


    if (personajesCompletados >= personajesEnJuego.length) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}


export function iniciarJuego() {
    if (intervaloId !== null) clearInterval(intervaloId);


    salvados = 0;
    estrellados = 0;
    personajesCompletados = 0;


    if (resueltos) resueltos.textContent = salvados;
    if (estrelladoss) estrelladoss.textContent = estrellados;


    personajesEnJuego = crearDatosPersonajes();
    window.personajesEnJuego = personajesEnJuego;
    crearElementosDOM(personajesEnJuego);


    intervaloId = setInterval(actualizarCaida, INTERVALO_MS);
}


if (empezar) {
    empezar.addEventListener("click", () => {
        if (panel) {
            panel.classList.remove("mostrar");
            panel.classList.add("oculto");
        }
        iniciarJuego();
    });
"use strict";

// --- CONSTANTES DE FÍSICAS ---
export const cantidadPersonajes = 50;
export const gravedad = 900;
export const velocidadConParacaidas = 110;
export const altoPersonaje = 80;

export const FPS = 60;
export const INTERVALO_MS = 2000 / FPS;
export const DELTA_SEGUNDOS = 1 / FPS;

// --- ESTRUCTURA DE DATOS ---
export function crearDatosPersonajes() {
    const escenario = document.querySelector("#escenario");
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

// --- CÁLCULO DE MOVIMIENTO ---
export function calcularNuevaPosicion(personaje, limiteY) {
    if (personaje.estado === "cayendo") {
        personaje.velocidad += gravedad * DELTA_SEGUNDOS;
    } else if (personaje.estado === "paracaidas") {
        personaje.velocidad = Math.min(
            personaje.velocidad + gravedad * DELTA_SEGUNDOS,
            velocidadConParacaidas
        );
    }

    personaje.y = Math.min(limiteY, personaje.y + personaje.velocidad * DELTA_SEGUNDOS);
    return personaje.y >= limiteY; // Retorna true si llegó al suelo
}