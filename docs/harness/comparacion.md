# Comparación: con harness vs sin harness

Ticket: **LA-1** — Implementar login en el frontend  
Modelo: Opus 5.5 (Claude Max) en ambos lados  
Fecha: 2026-10-18

> Solo planes. **No aplicar** el plan en ninguna de las dos corridas.

---

## Con harness (`flowsync-ai4devs-202610-seniors-I`)

Lanzado con: `/priority-ticket`

1. **Qué archivos propone tocar** (cuenta): **~20+ paths en `frontend/`**, backend **0** (solo leer).

   - Config: `vite.config.ts`, `tsconfig*.json`, `src/index.css`, quitar `App.css`/assets plantilla, `frontend/.env.example`, `src/vite-env.d.ts`, `components.json`, `src/lib/utils.ts`, `src/components/ui/{button,input,label,card,alert}` (shadcn).
   - API/sesión: `src/lib/api.ts`, `src/lib/types.ts`, `src/auth/` (`AuthProvider`, `useAuth`, `ProtectedRoute`).
   - Páginas: `src/pages/{LoginPage,SignupPage,ProfilePage}`.
   - Entrada: `src/App.tsx`, `src/main.tsx`.
   - Aviso explícito: **no stagear** `backend/.adonisjs`, `schema.ts`, etc. (codegen).

2. **Convenciones del proyecto que respetó / no respetó** (una a una):

   - **Respetó:** backend read-only; contrato real (`{ data }`, `oat_`, Bearer, CORS, 400/422/401).
   - **Respetó:** hueco ticket vs VineJS → incluye `passwordConfirmation` en signup.
   - **Respetó:** shadcn (copiado), React Router, alias `@`, Tailwind v4, `VITE_API_URL`.
   - **Respetó:** errores visibles (Alert / por campo), nunca solo consola; UX en español aunque el API hable inglés.
   - **Respetó (en el plan de cierre):** rama `harness-fjf`, no stagear codegen, `/commit`, `gh pr create`, `adversarial-reviewer`, chat solo con URL del PR.
   - **Respetó alcance acordado:** `fullName` opcional; sin logout; sin proxy Vite.
   - **Matiz:** propone `npm run build` al final “si el usuario lo permite” — no lo fuerza a ciegas.

3. **Cuántas veces tuve que intervenir**:

   Preguntas de diseño en plan mode (Token, Router, Post-signup, Alcance) + Submit. Sin rescatar el API. Espera al agente Explore (~2 min).

4. **Qué me tocaría arreglar a mano** antes de enseñárselo a alguien del equipo:

   - Scaffolding shadcn/Tailwind v4 en Vite pelado (fricción real de setup).
   - Sin logout (decisión de alcance): incompleto para demo de producto.
   - `localStorage` + XSS; mensajes del backend en inglés mapeados a mano.
   - Tipos API a mano en `types.ts` en vez del registry Tuyau del backend (deuda consciente del plan).

---

## Sin harness (`flowsync-sin-harness`)

Lanzado con: instrucción a mano (tras `Unknown command: /priority-ticket`)

1. **Qué archivos propone tocar** (cuenta): **más que el harness** (~25–30 paths), arquitectura “screaming”:

   - Tooling: Tailwind v4, alias `@`, shadcn (`button`, `input`, `label`, `card`, `alert`, **`form`** + RHF/zod), react-router, **proxy Vite `/api`**.
   - `src/shared/api/{http.ts,api-error.ts}`
   - `src/features/auth/{api,model,context,components,pages,routes}/…` (LoginForm/SignupForm + pages + ProtectedRoute + schemas + token-storage)
   - `src/features/account/pages/ProfilePage.tsx` (con **logout**)
   - `src/app/{router.tsx,App.tsx}`
   - Extra de verificación: Vitest + Testing Library + **MSW** (tests de formularios/rutas).

2. **Convenciones del proyecto que respetó / no respetó** (una a una):

   - **Respetó (leyendo código + README):** backend read-only; `passwordConfirmation`; envelope `data`; `oat_`; 400/422/401.
   - **Respetó:** shadcn, errores claros en UI, token en localStorage.
   - **No había convenciones de harness escritas:** no menciona `/commit`, `gh pr`, `adversarial-reviewer`, ni “no stagear codegen”, ni rama `harness-fjf`.
   - **Inventó estructura de equipo** (features/shared, container/presentational, TDD+MSW) que **no está** en el repo ni en el ticket.
   - **Ampliación de alcance vs criterios:** logout + proxy + form/zod + suite de tests — el ticket no los pide.
   - **Copy en español rioplatense** (“¿No tenés cuenta?”) — no hay guía de tono en el proyecto.

3. **Cuántas veces tuve que intervenir**:

   1 intento fallido (`/priority-ticket` → unknown). 1 prompt largo a mano. El plan salió sin el cuestionario Token/Router/Alcance del harness (menos idas y vueltas de UI, más decisiones tomadas solo).

4. **Qué me tocaría arreglar a mano** antes de enseñárselo a alguien del equipo:

   - Recortar scope (MSW/Vitest, logout, proxy, RHF) para no hinchar el PR del módulo 1.
   - Alinear estructura a algo más simple o documentarla; el repo no usa “screaming architecture”.
   - Revisar tono de copy y que el proxy no choque con cómo se documenta `VITE_API_URL` en el otro lado.
   - Sin reglas de cierre: yo tendría que acordar a mano commit/PR/review.

---

## Parte B — tres líneas

1. **Hasta qué pieza llegué, y cuál me costó más:**

   Llegué a las **8 piezas** del harness + las **dos corridas de plan** (con/sin). Lo que más tiempo comió: autenticar/aprobar el MCP Atlassian y el ir-y-venir de preguntas de diseño en el plan con harness (Token/Router/Alcance), no el escribir las skills en sí.

2. **Primera diferencia entre las dos salidas, y en qué me fijé:**

   Abrí los dos planes lado a lado y lo primero que saltó fue la **estructura de carpetas y el alcance**: harness → `src/lib` + `src/pages` plano, sin logout ni proxy; pelada → `features/auth` + `shared/api`, **logout**, **proxy `/api`**, y encima **Vitest/MSW**. Misma LA-1, distinto “tamaño” del trabajo propuesto.

3. **Algo que dejé escrito en el harness y que el agente no cumplió igualmente:**

   En `CLAUDE.md` / reglas de proceso dejé el cierre con **`/commit` + `gh pr create` + `adversarial-reviewer` y chat solo con la URL**. El plan con harness **sí las listó**, pero aun así me obligó a un cuestionario de diseño largo (Token/Router/…) como si el contexto del repo no bastara para proponer defaults: el archivo sube la probabilidad de un buen recorrido, **no evita** que el agente negocie alcance y me haga intervenir.
