"use strict";

export const cantidadPersonajes = 50;
export const gravedad = 900;
export const velocidadConParacaidas = 110;
export const altoPersonaje = 80;

export const FPS = 60;
export const INTERVALO_MS = 1000 / FPS;
export const DELTA_SEGUNDOS = 1 / FPS;

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
    return personaje.y >= limiteY;
}

export function crearElementosDOM(personajesEnJuego) {
    const divPersonajes = document.querySelector("#personajes");
    if (!divPersonajes) return;
    
    divPersonajes.innerHTML = "";

    personajesEnJuego.forEach((personaje) => {
        const img = document.createElement("img");
        img.className = "personaje";
        img.dataset.id = personaje.id;
        img.src = "./img/cayendo.gif";
        img.style.position = "absolute";
        img.style.left = `${personaje.x}px`;
        img.style.top = `${personaje.y}px`;

        if (personaje.estado === "esperando") {
            img.style.display = "none";
        }

        divPersonajes.appendChild(img);
        personaje.elemento = img;
    });
}

export function paracaidasPersonaje(evento, personajesEnJuego) {
    const elemento = evento.target.closest(".personaje");
    if (!elemento) return;

    const id = Number(elemento.dataset.id);
    const personaje = personajesEnJuego.find((item) => item.id === id);

    if (!personaje || personaje.estado !== "cayendo") return;

    personaje.estado = "paracaidas";
    personaje.velocidad = Math.min(personaje.velocidad, velocidadConParacaidas);
    if (personaje.elemento) personaje.elemento.src = "./img/paracaidas.gif";
}