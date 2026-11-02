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