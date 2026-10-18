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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** generó `CLAUDE.md` en la raíz.

## Prompt 2

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
/mcp
```

**Qué salió:** Authentication successful. Connected to atlassian.

## Prompt 3

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
Crea una skill de proyecto `/priority-ticket` en `.claude/skills/priority-ticket/SKILL.md`.

Debe hacer esto, en este orden:
1. Con el MCP de Atlassian del proyecto, buscar el ticket de mayor prioridad asignado a mí en estado «Por hacer» del proyecto LA (LIDR - Academy, sitio fjimenez3703.atlassian.net).
2. Cargar el ticket completo y resumirme: clave, resumen, prioridad y criterios de aceptación.
3. Entrar en plan mode y proponer un plan de implementación. No escribas ni edites código de la app.
4. Solo cuando yo apruebe el plan, mueve el ticket a «En curso» (mira las transiciones disponibles; no inventes IDs). Si rechazo o pedimos cambios al plan, no lo transiciones.

Reglas: un solo ticket; si no hay ninguno en «Por hacer», párate y dímelo; si el MCP no está autenticado, dime que use /mcp.
```

**Qué salió:** creó `.claude/skills/priority-ticket/SKILL.md` y el ticket de login en Jira (proyecto LA).

## Prompt 4

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
Crea la skill de proyecto `/commit` en `.claude/skills/commit/SKILL.md`.

Debe: mirar solo lo staged (`git status`, `git diff --cached`, `git log` reciente), redactar un commit convencional `tipo(scope): descripción`, hacer el commit, y confirmar. Si no hay nada staged, párate y dímelo. No hagas push ni stages por tu cuenta salvo que te lo pida.
```

**Qué salió:** creó `.claude/skills/commit/SKILL.md`.

## Prompt 5

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
Crea el subagente de proyecto `adversarial-reviewer` en `.claude/agents/adversarial-reviewer.md`.

Debe revisar un pull request intentando romperlo (no aprobarlo). Solo lectura: sin Write/Edit. Usa gh para ver el PR y el diff, reporta hallazgos por severidad con evidencia y cómo romperlo. Si no encuentra fallos claros, di qué revisaste y el riesgo residual — nunca un LGTM solo.
```

**Qué salió:** creó `.claude/agents/adversarial-reviewer.md`.

## Prompt 6

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
Monta un hook PostToolUse (Write|Edit) que formatee el frontend cada vez que el agente edite un archivo bajo frontend/src/**.

Instala Prettier en frontend/, añade script format y .prettierrc, y configura el hook en `.claude/settings.json` disparando un script en `.claude/hooks/` (compatible con Windows).
```

**Qué salió:** Prettier en frontend/, hook PowerShell + `.claude/settings.json`.

## Prompt 7

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
Añade al final de CLAUDE.md las reglas de proceso del harness, sin reescribir el resto del archivo:

- rama nueva antes de tocar código
- al cerrar: /commit y gh pr create
- después el subagente adversarial-reviewer sobre el PR
- en el chat, solo la URL del pull request
```

**Qué salió:** sección «Process rules (harness)» al final de CLAUDE.md.

## Prompt 8

**Modelo:** Opus 4.7 (1M context)
**Herramienta:** Claude Code

```
Crea AGENTS.md como enlace simbólico a CLAUDE.md (ln -s CLAUDE.md AGENTS.md o equivalente en Windows) para que otras herramientas lean las mismas instrucciones.
```

**Qué salió:** `AGENTS.md` → `CLAUDE.md`.

## Prompt 9

**Modelo:** Opus 5.5 (Claude Max)
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** encontró LA-1, detectó huecos (`passwordConfirmation`, token, stack frontend), entró en plan mode, preguntó Token/Router/Post-signup/Alcance y escribió el plan. No se aplicó.

## Prompt 10

**Modelo:** Opus 5.5 (Claude Max)
**Herramienta:** Claude Code (en `flowsync-sin-harness`)

```
/priority-ticket
```

**Qué salió:** `Unknown command: /priority-ticket` (esperado: la copia pelada no tiene la skill).

## Prompt 11

**Modelo:** Opus 5.5 (Claude Max)
**Herramienta:** Claude Code (en `flowsync-sin-harness`)

```
Trae el ticket de mayor prioridad asignado a mí en «Por hacer» del proyecto LA (LIDR - Academy). Resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo. No implementes ni edites código.
```

**Qué salió:** plan de LA-1 con arquitectura features/shared, logout, proxy Vite, RHF/zod y Vitest+MSW. No se aplicó.
