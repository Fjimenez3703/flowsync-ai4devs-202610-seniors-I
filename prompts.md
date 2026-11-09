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
antes de tocar nada: el requisito "Lo que cada tarea muestra de su responsable"
de openspec/specs/tasks/spec.md, cuantos scenarios tiene? solo dime el numero
y el titulo de cada uno, no mires los tests todavía
```

**Qué salió:** me listó los 3 scenarios. bien.

---

## Prompt 2

**Modelo:** Auto
**Herramienta:** Cursor

```
ok ahora si, mira la suite de tests (backend/tests) y dime si alguno cubre
esos 3 scenarios del responsable en la tarea. necesito rellenar la matriz:
scenario / test que lo cubre / cubierto|no cubierto|no lo se

ojo, no inventes cobertura. si un test se llama parecido pero comprueba otra cosa,
dilo
```

**Qué salió:** dijo que no hay carpeta tasks en tests, solo auth. los de iniciales me liaron.

---

## Prompt 3

**Modelo:** Auto
**Herramienta:** Cursor

```
espera, initials.spec.ts no cubre lo del assignee?? usa Ada Lovelace y AL igual...
abre el test y dime exactamente que endpoint pega
```

**Qué salió:** pega a login, no a tasks. entonces no cubre. lo dejo en "no lo se" en la matriz porque al principio dudé.

---

## Prompt 4

**Modelo:** Auto
**Herramienta:** Cursor

```
mira tambien el transformer del assignee y el de la lista, a ver si la lista
y el show usan lo mismo. no arregles nada, solo dime
```

**Qué salió:** la lista usa UserTransformer (con email) y el detail usa TaskAssigneeTransformer. ahi hay un bug pero no lo toco.

---

## Prompt 5

**Modelo:** Auto
**Herramienta:** Cursor

```
escribe los 3 tests que faltan en backend/tests/functional/tasks/, uno por
scenario, mismo estilo que auth (japa + withGlobalTransaction).

importante:
- NO toques codigo fuera de tests
- si salen en rojo se quedan en rojo
- el de "no filtra email" tiene que mirar lista Y tarea suelta
- el de sin nombre: fullName null e iniciales presentes, sin inventarme el valor exacto
- nombre e iniciales compruebalos en GET (lista y suelta), no solo en el POST

despues los lanzas
```

**Qué salió:** el del email falla en lista y en el POST de creación. show va bien. los otros pasan.

---

## Prompt 6

**Modelo:** Auto
**Herramienta:** Cursor

```
montame docs/verificacion/fjf.md con la matriz en el formato de la leccion
(2 numeros arriba + tabla) y debajo las 3 lineas de la parte B.

para la parte B:
1. antes de mirar creia 1, al final 0
2. el scenario del que dude entre hueco de test vs hueco de spec
3. lo de las iniciales sin nombre que tuve que decidir yo

nada de florituras
```

**Qué salió:** archivo listo.
