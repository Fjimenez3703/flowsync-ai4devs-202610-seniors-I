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

**Modelo:** Composer
**Herramienta:** Cursor

```
Mira el repo y dime qué hay ya montado de verdad:
qué se puede usar hoy y cómo está el modelo de datos.
En 3-5 líneas, sin inventarte nada.
Déjalo en docs/prd/alcance-mvp-fjf.md
```

**Qué salió:** solo autenticación. Usuarios y tokens. Ni rastro de tareas.

---

## Prompt 2

**Modelo:** Composer
**Herramienta:** Cursor

```
Tengo que recortar un MVP de FlowSync. El enunciado es vago:
"tareas compartidas, más en tiempo real, menos rollo que Jira".

Antes de proponerme el alcance, hazme solo 5 preguntas (una ronda, no más)
sobre el problema, los usuarios y hasta dónde llega. Sin tablas ni APIs.

Las respuestas no las inventes: usa la ficha de hechos del README tal cual.
Si algo no viene ahí, lo marcas como supuesto.

Luego me armas: problema, usuarios, propuesta de valor, alcance y NO-alcance.
Recorta en serio. Cada cosa que dejes fuera, con el porqué de producto.
docs/prd/alcance-mvp-fjf.md
```

**Qué salió:** buenas preguntas; el alcance salió demasiado largo (unas 9 cosas).

---

## Prompt 3

**Modelo:** Composer
**Herramienta:** Cursor

```
Esto se pasa de largo. Déjame como mucho 5 capacidades.
La autenticación ya está, no la cuentes como nueva.

El NO-alcance que pese igual o más que el alcance.
Y al final del mismo archivo, tres líneas:

1. cuántas metiste frente a cuántas quedan
2. tres fuera y por qué (de producto, no de "no da tiempo")
3. la exclusión que más me duele y cuándo la metería

Sin endpoints ni modelo de datos.
```

**Qué salió:** de 9 a 5. Lo que más me rasca es quitar el resumen de “qué se ha movido”.

---

## Prompt 4

**Modelo:** Composer
**Herramienta:** Cursor

```
El fondo me cuadra, pero se lee demasiado genérico.
Reescribe el markdown entero (los 3 tramos + la parte B) como si lo
estuviera defendiendo yo en una reunión: el episodio concreto, el equipo
de 6 personas en 3 husos horarios, el riesgo de que el estado se quede viejo, el éxito a una semana.

Las mismas 5 capacidades. Sin tablas ni endpoints.
Que no suene a plantilla.
docs/prd/alcance-mvp-fjf.md
```

**Qué salió:** mucho mejor; ese es el que subí al PR.
