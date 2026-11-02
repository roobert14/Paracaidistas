"use strict";


import { velocidadConParacaidas } from "./fisicas.js";


const divPersonajes = document.querySelector("#personajes");


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


if (divPersonajes) {
    divPersonajes.addEventListener("click", (e) => paracaidasPersonaje(e, window.personajesEnJuego || []));
}