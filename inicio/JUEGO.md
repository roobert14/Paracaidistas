# El juego · ¡Salva a los paracaidistas!

JavaScript puro. La pantalla ya está (HTML, CSS, GIF). **El JS lo hacéis vosotros desde cero** en `js/juego.js` (o en los archivos que organicéis).

## Idea

Hay **50** paracaidistas. Pulsas uno mientras cae para abrir el paracaídas.  
La partida acaba con **3 impactos** o cuando los **50** han llegado al suelo.

## Qué tiene que hacer el programa

### Personajes

- Crear los 50 botones con **`innerHTML`** en `#personajes`.
- Un array de 50 objetos con `id`, `x`, `y`, `velocidad`, `estado`, `elemento` (el botón).
- Estados: `esperando` → `cayendo` → `paracaidas` → `salvado` o `estrellado`.
- Cada botón: imagen y `data-id`.
- Contadores, iniciar, finalizar y reiniciar sin duplicar temporizadores ni eventos.

### Caída

- Aparecen de uno en uno con `setTimeout` (tiempos según dificultad).
- Se mueven con `setInterval` de **20 ms** cambiando `style.top` (sin animaciones CSS / `transform`).
- Al redimensionar la ventana, reajustar posiciones (sin recontar llegadas).

| Dificultad | Velocidad caída libre | Tiempo entre apariciones |
|---|---|---|
| Fácil | 2–4 px | 1800–3200 ms |
| Normal | 3–7 px | 1000–3000 ms |
| Difícil | 5–10 px | 450–1200 ms |

Con paracaídas: velocidad **1 px**.

### Clic y suelo

- **Un solo** `click` en `#personajes` (delegación). Solo si está `cayendo`.
- Al suelo: con paracaídas → `salvado`; sin él → `estrellado` (ocultar a los 2 s).
- Cada llegada se cuenta **una sola vez**.

### Historial

- Guardar en `localStorage`: nombre (1–40), fecha, puntos, impactos, dificultad.
- Una vez por partida. Listar y ordenar por fecha o puntos.
- Si falla o hay datos corruptos: avisar, **no borrar** lo guardado. Nombres con `textContent`.

## IDs útiles del HTML

`#iniciar`, `#reiniciar`, `#dificultad`, `#personajes`, `#suelo`, `#escenario`,  
`#salvados`, `#estrellados`, `#resueltos`, `#panel-inicio`, `#panel-final`, `#resultado`,  
`#guardar-partida`, `#nombre`, `#ver-historial`, `#historial`, `#filas-historial`, `#orden-historial`.
