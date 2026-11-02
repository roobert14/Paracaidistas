"use strict";

import { paracaidasPersonaje } from "./funciones.js";

const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");
const botonHistorial = document.querySelector("#ver-historial");
const historial = document.querySelector("#historial");
const cerrarHistorial = document.querySelector("#cerrar-historial");

if (botonHistorial && historial) {
    botonHistorial.addEventListener("click", () => historial.classList.add("mostrar"));
}
if (cerrarHistorial && historial) {
    cerrarHistorial.addEventListener("click", () => historial.classList.remove("mostrar"));
}

if (divPersonajes) {
    divPersonajes.addEventListener("click", paracaidasPersonaje);
}

export function botonEmpezar() {
    if (empezar) {
        empezar.addEventListener("click", function () {
            if (panel) {
                panel.classList.remove("mostrar");
                panel.classList.add("oculto");
            }
        });
    }
}

botonEmpezar();