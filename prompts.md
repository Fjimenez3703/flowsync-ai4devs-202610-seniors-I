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
Estoy en la rama s3/start de FlowSync. Necesito la spec viva de lo que YA hace el sistema en cuentas y acceso (registro, login, sesión y perfil), backend y frontend.

Déjala en docs/spec-viva/fjf.md con este formato exacto:
- ## Purpose (1-2 frases)
- ## Requirements
- ### Requirement: ... con SHALL
- #### Scenario: ... con viñetas WHEN y THEN

Reglas:
- solo comportamiento observable (petición/respuesta o lo que ve la persona en pantalla)
- nada de nombres de clases, ficheros ni rutas de código
- en castellano
- NO uses ADDED/MODIFIED/REMOVED
- NO toques el código
- no te salgas del vertical de auth, aunque veas otras cosas en el repo

Cuando termines la spec, debajo del mismo archivo escribe la Parte B:
1) cuántos requisitos escribiste y cuántos he podido comprobar yo (deja los números y yo los ajusto)
2) incoherencias que salgan al contrastar
3) al menos una cosa donde no se sepa si es bug o contrato
```

**Qué salió:** me soltó la spec entera pero metió algún nombre de fichero en un escenario; tuve que corregirlo.

---

## Prompt 2

**Modelo:** Composer
**Herramienta:** Cursor

```
en la spec de docs/spec-viva/fjf.md quita cualquier mención a nombres de archivo, clases o rutas internas. Tiene que quedar solo comportamiento observable. revisa también que no se haya colado nada de tareas u otras features
```

**Qué salió:** limpio. Ya no salían rutas ni clases.

---

## Prompt 3

**Modelo:** Composer
**Herramienta:** Cursor

```
mira el flujo de logout y el de rehidratar la sesión al arrancar (token en localStorage + profile). quiero que me digas si hay algo raro entre lo que hace la API y lo que asume el frontend, para meterlo en las listas 2 y 3 de la parte B. no cambies código, solo señálame incoherencias o cosas ambiguas
```

**Qué salió:** ahí salieron lo del wrapper del logout, el 400 genérico del login y lo del token que se queda guardado si el backend está caído.

---

## Prompt 4

**Modelo:** Composer
**Herramienta:** Cursor

```
hazme la spec completa de FlowSync, todas las features del backlog E2 y E3 también
```

**Qué salió:** se fue por las ramas y empezó a inventar requisitos de tareas que aún no existen en el código. Lo paré; no sirve para este ejercicio.
