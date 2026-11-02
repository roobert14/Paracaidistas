# Empieza aquí

Sois un equipo de **3 o 4 personas**. Todos los equipos hacen el **mismo juego**. Cada equipo tiene **su propio repo**. Gana la mejor implementación.

## Qué os damos

- `index.html`, `css/`, `img/` — la interfaz y los dibujos (no hace falta cambiarlos)
- `js/juego.js` — **vacío**: ahí programáis todo el JavaScript
- Este enunciado, `JUEGO.md`, `CONCURSO.md` y `SEGUIMIENTO.md`

## En 5 pasos

1. Subid **toda esta carpeta** a un repositorio nuevo del equipo (primer commit).
2. Leed [`JUEGO.md`](JUEGO.md) (qué tiene que hacer el juego).
3. Repartid el trabajo (ejemplo):

| Persona | Se encarga de… |
|---|---|
| A | Crear los 50 personajes (`innerHTML`), empezar / terminar / reiniciar |
| B | Apariciones y movimiento (caída) |
| C | Clic del paracaídas y aterrizaje |
| D | Guardar partidas e historial |

Si sois **3**, D lo reparte el equipo (o lo hace C).

4. Trabajad con **Git**: rama → programar → **PR** → otra persona revisa → merge a `main`.
5. Entregad el enlace del repo (`main` jugable) + `SEGUIMIENTO.md` relleno.

## Git (resumen)

```text
main
 └── feature/aparicion   →  PR  →  revisión  →  merge
```

Como casi todo va en `js/juego.js`, acordad **quién toca qué funciones** y fusionad a menudo para no pisaros. Si preferís, podéis separar el código en varios `.js` y enlazarlos en `index.html`.

## Probar

Abrid `index.html` en el navegador. Al principio no hará nada hasta que programéis los botones y la lógica.
