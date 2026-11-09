# Matriz de trazabilidad — Lo que cada tarea muestra de su responsable

**Scenarios del requisito:** 3  
**Scenarios cubiertos:** 0

| Scenario | Prueba que lo cubre | Estado | Si "no lo sé", qué faltó |
|---|---|---|---|
| Con responsable "Ada Lovelace", el `assignee` trae ese nombre y sus iniciales | — | No lo sé | Había tests de iniciales con el mismo nombre en auth, pero no sabía si alguno tocaba el `assignee` de una tarea |
| Al obtener una tarea (lista o suelta), el `assignee` no trae email ni datos de acceso | — | No cubierto | |
| Si el responsable se registró sin nombre, llega `fullName` nulo e iniciales igual | — | No cubierto | |

Tras mirar la suite: no hay ningún test bajo `backend/tests/functional/tasks/`. Los de `auth/initials.spec.ts` comprueban iniciales en login/perfil, no en el responsable de una tarea. Los tres scenarios quedaban sin cobertura; añadí uno por scenario en `assignee.spec.ts`.

---

## Parte B

1. Creía cubiertos: 1. Estaban cubiertos: 0.
2. «Responsable identificable»: no supe al principio si el hueco era de test o de spec, porque los tests de auth hablan de las mismas iniciales y el mismo nombre, pero la regla de la tarea no la comprueba nadie.
3. El scenario no dice qué valor exacto tienen las iniciales si no hay nombre (solo que "siguen llegando"); al escribir el test decidí comprobar que llegan como string no vacío, sin fijar `SE` ni derivarlas del email.
