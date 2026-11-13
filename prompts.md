# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

## Prompt 1

**Modelo:** Auto
**Herramienta:** Cursor

```
abre CLAUDE.md y localiza la seccion "Reglas de proceso".
solo listamelas numeradas, una frase cada una, con tus palabras.
NO mires el historial todavía, no audites nada.
```

**Qué salió:** me sacó 5 bullets. las partí después porque algunas meten 2 reglas.

---

## Prompt 2

**Modelo:** Auto
**Herramienta:** Cursor

```
ok, sin mirar commits: para cada regla dime si CREES que se cumple
en este repo. solo si / no / ni idea. es mi apuesta, no inventes evidencia
```

**Qué salió:** me devolvió apuestas. las copié a docs/auditoria/fjf.md tal cual antes de seguir.

---

## Prompt 3

**Modelo:** Auto
**Herramienta:** Cursor

```
ahora si. auditoria de esas reglas contra los ultimos 15 commits
y el arbol actual.

importante:
- NO cambies ningun archivo del repo
- deja el resultado en docs/auditoria/fjf.md (crea la carpeta si hace falta)
- una fila por regla, con: que pide / que se miro / veredicto / evidencia / que haria
- veredicto solo: se cumple | no se cumple | no se puede comprobar con lo que hay
- que haria: dejarla | borrarla | bajarla

si una regla del CLAUDE.md mete dos cosas, separala en filas
```

**Qué salió:** se puso a escribir conclusiones sin pegar comandos. la columna "que se miro" salió vaga. no me sirve.

---

## Prompt 4

**Modelo:** Auto
**Herramienta:** Cursor

```
para. necesito los comandos concretos.
lanza tu mismo:
git log -15 --oneline
git show --stat de los commits que toquen controllers/transformers/validators/rutas
git branch -a --contains aee9a24
y mira si existe .claude/skills/commit y el adversarial-reviewer

vuelve a rellenar la tabla con evidencia real. sigue sin tocar codigo
```

**Qué salió:** ahí sí. 4e03d1f rompe lo del mismo commit. aee9a24 está en s5/start.

---

## Prompt 5

**Modelo:** Auto
**Herramienta:** Cursor

```
mira tambien con gh si alguno de esos 15 commits está en un PR del repo del curso
(LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I).
y el reflog local, a ver si se puede saber en que rama se trabajó
```

**Qué salió:** los 15 no salen en PRs. reflog solo clone → auditoria-fjf. filas 1, 5 y 6 a "no se puede comprobar".

---

## Prompt 6

**Modelo:** Auto
**Herramienta:** Cursor

```
actualiza docs/auditoria/fjf.md con la tabla final (la apuesta arriba sin tocarla)
y debajo la parte B en 3 lineas:

1. la regla donde mas falle mi apuesta
2. una que no se pueda comprobar + que faltaria para dejar rastro
3. cual borraria y por que (de los 2 grupos tipicos)

nada de florituras. no toques otros archivos
```

**Qué salió:** archivo listo. apuesta intacta.
