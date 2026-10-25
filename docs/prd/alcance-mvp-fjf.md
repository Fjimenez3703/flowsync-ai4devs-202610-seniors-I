# Alcance MVP FlowSync — fjf

## 1. Terreno que ya existe

FlowSync es un monorepo de práctica (backend AdonisJS 7 + SQLite, frontend React 19 + Vite). Hoy solo hay una capacidad de punta a punta: **autenticación**. Se puede crear cuenta, iniciar sesión (token de acceso), ver el perfil y cerrar sesión. El modelo de datos se limita a usuarios (nombre, correo, contraseña) y tokens de acceso. En la interfaz hay registro, inicio de sesión y perfil protegido. No hay tareas, estados de trabajo, lista compartida ni nada que permita ver «en qué está el equipo».

---

## 2. Interrogatorio

**Preguntas (una sola ronda):**

1. ¿Quién sufre el problema de verdad y qué decisión debería poder tomar al abrir la herramienta?
2. ¿Qué ritual o interrupción concreta queremos que desaparezca, y qué admitimos que seguirá igual?
3. ¿Qué significa aquí «más en tiempo real» — y qué interpretaciones rechazamos a propósito?
4. ¿Cuál es el mínimo de una tarea y de la lista para que deje de hacer falta preguntar «¿en qué estás?»?
5. ¿Dónde cortamos el MVP (equipos, roles, avisos, integraciones, convivencia con otras herramientas)?

**Respuestas (ficha de hechos del producto):**

- Duele la daily de sincronización y el «¿en qué estás?» constante por Slack o el chat: nadie ve el estado del equipo sin interrumpir.
- El valor lo cobran los compañeros, no un responsable de equipo. No hay informe hacia arriba; a un manager le daría igual. Duele quien pisa el trabajo de otro y quien tiene que cortar para enterarse.
- Episodio: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días tirados.
- La daily no desaparece entera. Desaparece la ronda de «¿en qué estás?» (hoy cerca de la mitad de los 15 minutos). Los bloqueos siguen; este MVP no los resuelve.
- Usuarios: equipos remotos pequeños, de 3 a 10 personas. Roles planos: todos ven y editan lo mismo.
- Caso de estudio: equipo de 6 en producto SaaS, 3 husos horarios, gestor pesado + daily por videollamada. No es un cliente real.
- Un solo espacio compartido, sin entidad «equipo». Varios equipos o pertenecer a más de uno queda fuera (supuesto; no se construye).
- «Tiempo real» = ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, videollamada ni edición a la vez del mismo documento.
- Frescura, no presencia: estado de la tarea, no de la persona. Sin «quién está conectado» ni indicadores de actividad (eso es vigilancia).
- Señal tipo resumen que espera: llego por la mañana o vuelvo de una reunión y veo qué se ha movido. Sin notificaciones push.
- La decisión que cambia: no empezar lo que otro ya toca, y elegir lo siguiente sabiendo qué está libre. «Sentirse informado» solo no justifica el tiempo real.
- El estado lo teclea quien hace la tarea, en segundos. Git/PRs, CI o calendario quedan fuera (otro producto).
- Se sostiene porque son dos clics sobre una lista ya abierta, sin sprint ni estimación, y quien escribe gana al momento: esa lista es su cola.
- Si la información se queda vieja, el producto se cae. Riesgo nº 1. Mitigación: que actualizar sea barato, no obligar a nadie.
- Sustituye al gestor de tareas; no convive con él. FlowSync crea las tareas. Convivir = doble actualización = fracaso.
- Fuera de usuario: sprints, estimaciones, épicas, backlog priorizado, informes.
- «Menos rollo que Jira» = crear una tarea y cambiarle el estado en segundos, sin configuración ni campos de más.
- Una tarea en el MVP: título, responsable, estado y fecha de vencimiento (para ver de un vistazo lo que se ha pasado de plazo).
- La lista se consume filtrando por estado (centrarse en lo pendiente).
- Éxito: dejar de hacer la ronda de «¿en qué estás?» porque el estado del equipo se ve de un vistazo.
- Criterio a una semana: cancelan esa ronda y nadie pide que vuelva.
- Construir una vertical fina usable de punta a punta, no un andamiaje amplio.
- Fuera ya decidido: notificaciones push, Slack, roles/permisos avanzados, analítica e informes, comentarios.

**Supuestos:**

- Los nombres de los estados (p. ej. pendiente / en curso / hecho) se fijan al construir; la ficha exige «estado», no la taxonomía.
- «Ver qué se ha movido» al llegar se intenta cubrir con la lista fresca y filtrable, no con un resumen aparte (exclusión débil en la Parte B).
- Un único espacio del caso de estudio; sin varios espacios ni alta de varios equipos.

---

## 3. Alcance (tras recorte)

### Problema

En un equipo remoto pequeño el estado del trabajo es invisible salvo que interrumpas: Slack («¿en qué estás?») o la ronda de la daily. El coste no es abstracto: dos personas pueden pisarse el mismo módulo la misma semana y perder días. De la daily de 15 minutos, lo que queremos atacar es esa ronda de sincronización (cerca de la mitad del tiempo), no la parte de bloqueos — esa queda fuera. El riesgo que hay que validar de verdad es si la gente actualizará el estado: si se queda viejo, FlowSync no sirve para decidir qué coger.

### Usuarios

Compañeros que trabajan codo a codo, no mandos ni responsables con reporting. El dolor lo viven quien se solapa sin querer y quien corta el hilo de otro para preguntar. Caso de estudio: 6 personas en producto SaaS, 3 husos horarios, hoy con gestor pesado y daily en videollamada. Encaja en equipos remotos de 3 a 10 con permisos planos (todos ven y editan). Quien necesite sprints, estimaciones, épicas o informes no es nuestro usuario de este MVP.

### Propuesta de valor

Una sola lista compartida donde se hace el trabajo: crear una tarea y cambiarle el estado en segundos, con lo mínimo (título, responsable, estado, vencimiento). Quien actualiza gana al momento — esa lista es su cola — y el resto deja de interrumpirle. Al llegar por la mañana o al volver de una reunión ves el estado del equipo sin preguntar ni refrescar a mano: frescura de la **tarea**, no presencia ni notificaciones. Sustituye al gestor pesado para «quién está en qué»; no convive con él. Éxito a una semana: cancelan la ronda de «¿en qué estás?» y nadie la echa de menos.

### Alcance

Vertical fina. Cinco capacidades nuevas; la autenticación que ya existe se reutiliza y no se vuelve a especificar.

1. **Espacio único compartido** — una lista para quien tiene cuenta; sin entidad «equipo» ni varios espacios.
2. **Crear tarea** — título, responsable, estado y fecha de vencimiento; sin campos ni flujos de configuración.
3. **Cambiar estado en segundos** — lo escribe quien hace la tarea; es su cola y la visibilidad del equipo a la vez.
4. **Filtrar por estado** — centrarse en lo pendiente y decidir qué está libre.
5. **Frescura del estado** — ver cambios de estado sin refrescar ni preguntar; nunca presencia de personas.

**Éxito medible:** a una semana de uso, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva.

### NO-alcance

Cada exclusión es una decisión de producto (qué hipótesis no ayuda a validar), no falta de tiempo.

- **Varios equipos / estar en más de uno** — validamos un espacio compartido del caso de estudio; varios equipos abren otro producto.
- **Roles y permisos** — la hipótesis es roles planos entre compañeros; la jerarquía no explica el dolor.
- **Presencia / «quién está conectado»** — validamos el estado de la tarea; la presencia es vigilancia y la rechazamos.
- **Chat, videollamada, coedición** — no son el dolor; el dolor es no ver en qué está cada tarea.
- **Notificaciones push y Slack** — validamos el «resumen que espera», no la interrupción que ya tienen.
- **Comentarios en tareas** — validamos dos clics; los comentarios convierten la lista en un hilo de debate.
- **Resumen «qué se ha movido» como pantalla aparte** — se intenta cubrir con la lista fresca; ese resumen es otra forma de señal (ver Parte B).
- **Vista «solo mis tareas»** — el valor es ver al equipo para no pisarse; el filtro por estado basta.
- **Edición rica / muchos campos / flujos de trabajo** — contradice «menos rollo que Jira»; el mínimo son cuatro datos.
- **Historial, actividad, analítica, informes** — no validan dejar de preguntar el estado; son mirada hacia arriba.
- **Sprints, estimaciones, épicas, backlog priorizado** — usuario distinto al de este MVP.
- **Integraciones Git / PR / CI / calendario** — el estado lo teclea la persona; las señales externas son otro producto.
- **Convivir con otro gestor** — la doble actualización mata el hábito; FlowSync es donde se crean las tareas.
- **Bloqueos de la daily** — fuera del episodio; solo atacamos la ronda de estado.

---

## Parte B — tres líneas

1. **Los dos números:** la primera propuesta metía **9** cosas en el alcance; tras el recorte quedaron **5**.
2. **Tres fuera y por qué:** (a) **comentarios** — no validan una actualización barata, abren discusión; (b) **presencia / conectados** — valida vigilancia, no «qué tarea está libre»; (c) **Slack / push** — valida interrupción, no el «llego y miro» del caso.
3. **Exclusión de la que menos seguro estoy:** el **resumen «qué se ha movido»**. La ficha pide una señal tipo resumen al llegar, y con 3 husos una lista filtrable puede no bastar. Entraría si, tras una semana, la ronda de la daily vuelve porque la gente no distingue qué cambió desde ayer al recorrer la lista entera.
