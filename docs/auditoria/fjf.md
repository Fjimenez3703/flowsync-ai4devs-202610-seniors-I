# Auditoría — reglas de proceso (fjf)

Ventana: últimos 15 commits (`aee9a24` … `b955a72`) + árbol actual.
Fuente de las reglas: `CLAUDE.md` → sección «Reglas de proceso».

## Apuesta (antes de mirar)

| # | Regla (resumen) | Apuesta |
|---|---|---|
| 1 | Si ya estás en rama de trabajo, no abras otra | sí |
| 2 | Rama nueva solo desde main/sN/* con `feat/<slug>`; nada de commits en main ni sN/* | sí |
| 3 | Al cerrar cada petición, commit con `/commit` | ni idea |
| 4 | Cambio de capability lleva `.adonisjs/` + README en el mismo commit | sí |
| 5 | Un solo `gh pr create` + `adversarial-reviewer` al terminar la unidad | ni idea |
| 6 | Al abrir el PR, en el chat solo la URL | ni idea |

## Tabla

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | Antes de tocar código, si la rama ya es de trabajo (no `main`, no `sN/*`), seguir en ella | `git reflog -15`; `git log -15 --oneline` | no se puede comprobar con lo que hay | El reflog de este clon solo tiene `clone` → `auditoria-fjf`. Git no guarda en qué rama se hizo cada commit del historial | bajarla |
| 2 | Rama nueva solo desde `main`/`sN/*` (`feat/<slug>`); nunca commit directo en `main` ni en `sN/*` | `git log -15 --oneline`; `git branch -a --contains aee9a24`; `git branch -a` | no se cumple | `aee9a24`, `21ce54d` y `afc4b74` viven en `s5/start` (docs del módulo). En el fork las ramas son `*-fjf`, ninguna `feat/<slug>` | dejarla |
| 3 | Cada petición se cierra con la skill `/commit` | `.claude/skills/commit/SKILL.md`; `git log -15 --format="%h %s"` | no se puede comprobar con lo que hay | La skill existe y pide `tipo(scope): …`. Los mensajes se parecen, pero del historial no se ve si salió de `/commit` o a mano. `aee9a24` va sin scope (`docs: …`) | bajarla |
| 4 | Si tocas rutas/controllers/validators/transformers de una capability, mismo commit con diff de `.adonisjs/` y `docs/capabilities/<nombre>/README.md` | `git show --stat 4e03d1f`; `git show --stat cbe9617`; `git show --stat ea5db1f` | no se cumple | `4e03d1f` toca `task_transformer.ts` solo. `cbe9617` lleva controllers + README pero no `.adonisjs/`. `ea5db1f` lleva `.adonisjs/` + rutas y no el README | dejarla |
| 5 | `gh pr create` (cuerpo completo) + pase de `adversarial-reviewer` una vez al cerrar la unidad, no por petición | `gh pr list --repo LIDR-academy-temp/...`; `.claude/agents/adversarial-reviewer.md`; `gh api .../commits/<sha>/pulls` sobre varios de los 15 | no se puede comprobar con lo que hay | El agente está en el repo. Ninguno de estos 15 commits aparece metido en un PR del curso; del historial no se ve si el reviewer corrió ni si el cuerpo del PR era “completo” | borrarla |
| 6 | Al abrir el PR, no repetir el resumen en el chat: solo la URL | historial git + PRs del curso | no se puede comprobar con lo que hay | Eso pasa en la sesión del agente, no deja rastro en el repo | borrarla |

## Parte B

1. **La regla sobre la que me equivoqué:** la 2 (nada de commits en `sN/*` / ramas `feat/<slug>`). Había jurado que sí se cumplía; `aee9a24` y compañía están justo en `s5/start`.
2. **La que no se puede comprobar:** la 6 (solo URL en el chat). Para que deje rastro haría falta guardar la respuesta del agente o un log de la sesión; con git/PR no hay forma.
3. **La que borraría:** la 6. Es del grupo “no se cumple nunca / no se puede mirar y a nadie le ha importado”: no deja evidencia y no cambia el código.
