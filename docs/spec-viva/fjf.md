## Purpose

Permitir que una persona se registre, inicie sesión y recupere su perfil, de forma que solo quien tiene sesión válida pueda ver la zona autenticada de la aplicación.

## Requirements

### Requirement: Registro de cuenta nueva

El sistema SHALL permitir crear una cuenta nueva indicando email, contraseña y confirmación de contraseña. El nombre completo SHALL ser opcional.

#### Scenario: registro correcto

- **WHEN** una persona envía un email libre, una contraseña válida y la misma contraseña en la confirmación
- **THEN** el sistema crea la cuenta, inicia sesión automáticamente y devuelve los datos de la persona junto con un token de acceso

#### Scenario: nombre vacío

- **WHEN** una persona se registra dejando el nombre en blanco
- **THEN** la cuenta se crea igual y, en el perfil, aparece el texto “Sin nombre” en lugar de un nombre propio

### Requirement: Validación al registrarse

El sistema SHALL rechazar el registro cuando el email no es válido, cuando ya existe, cuando la contraseña no tiene entre 8 y 32 caracteres, o cuando la confirmación no coincide.

#### Scenario: email ya usado

- **WHEN** alguien intenta registrarse con un email que ya tiene cuenta
- **THEN** el sistema rechaza la petición y comunica que ese email ya está registrado

#### Scenario: contraseñas distintas

- **WHEN** la contraseña y su confirmación no coinciden
- **THEN** el sistema rechaza el registro y indica que las contraseñas no coinciden

#### Scenario: contraseña demasiado corta

- **WHEN** la contraseña tiene menos de 8 caracteres
- **THEN** el sistema rechaza el registro

#### Scenario: contraseña demasiado larga

- **WHEN** la contraseña tiene más de 32 caracteres
- **THEN** el sistema rechaza el registro

### Requirement: Inicio de sesión

El sistema SHALL permitir entrar con email y contraseña correctos, devolviendo los datos de la persona y un token de acceso.

#### Scenario: credenciales válidas

- **WHEN** una persona envía el email y la contraseña de una cuenta existente
- **THEN** el sistema inicia sesión y devuelve usuario y token

#### Scenario: credenciales incorrectas

- **WHEN** el email o la contraseña no son correctos
- **THEN** el sistema rechaza el acceso sin indicar cuál de los dos falla

### Requirement: Perfil de la persona autenticada

El sistema SHALL exponer el perfil de la persona que tiene sesión válida, con identificador, nombre, email, fecha de alta e iniciales visibles. Sin sesión válida, el perfil SHALL quedar inaccesible.

#### Scenario: pedir el perfil con sesión

- **WHEN** una persona autenticada pide su perfil
- **THEN** recibe sus datos públicos (sin la contraseña)

#### Scenario: pedir el perfil sin sesión

- **WHEN** alguien pide el perfil sin un token válido
- **THEN** el sistema deniega el acceso

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión de la persona autenticada e invalidar el token que estaba usando.

#### Scenario: logout con sesión activa

- **WHEN** una persona autenticada cierra sesión
- **THEN** ese token deja de servir para pedir el perfil u otras rutas protegidas

### Requirement: Rutas de acceso solo para invitados

Mientras la persona no tiene sesión, el sistema SHALL mostrar las pantallas de inicio de sesión y de registro. Si ya está autenticada, esas pantallas SHALL redirigir al perfil.

#### Scenario: visitante abre login o registro

- **WHEN** una persona sin sesión entra en login o registro
- **THEN** ve el formulario correspondiente

#### Scenario: autenticada intenta abrir login

- **WHEN** una persona con sesión válida abre login o registro
- **THEN** acaba en la pantalla de perfil

### Requirement: Zona autenticada protegida

El sistema SHALL exigir sesión válida para ver el perfil en la interfaz. Sin sesión, SHALL redirigir al inicio de sesión. Mientras comprueba un token guardado, SHALL mostrar un estado de carga y no expulsar todavía.

#### Scenario: sin sesión entra al perfil

- **WHEN** alguien sin sesión intenta abrir el perfil
- **THEN** es redirigido al inicio de sesión

#### Scenario: recarga con token guardado válido

- **WHEN** la persona recarga la aplicación teniendo un token válido guardado
- **THEN** recupera la sesión y puede seguir en el perfil sin volver a escribir la contraseña

#### Scenario: token guardado ya no vale

- **WHEN** la persona recarga con un token guardado que el servidor rechaza
- **THEN** pierde la sesión local, se borra el token guardado y puede volver a iniciar sesión; se le explica por qué

#### Scenario: token guardado y servidor inaccesible

- **WHEN** la persona recarga con un token guardado pero no se puede hablar con el servidor
- **THEN** queda como sin sesión y ve un aviso de conexión, pero el token sigue guardado (si el servidor vuelve y recarga, puede recuperar la sesión)

### Requirement: Pantalla de perfil y salida

En el perfil, el sistema SHALL mostrar el nombre (o un texto de “sin nombre”), el email, las iniciales y la fecha de alta, y SHALL ofrecer cerrar sesión.

#### Scenario: ver el perfil

- **WHEN** una persona autenticada está en el perfil
- **THEN** ve sus datos y un control para cerrar sesión

#### Scenario: cerrar sesión desde la UI

- **WHEN** pulsa cerrar sesión
- **THEN** la sesión local termina y acaba en el inicio de sesión

### Requirement: Mensajes de error comprensibles

Los fallos de validación, de credenciales, de sesión no válida o de conexión SHALL mostrarse en castellano de forma usable en la interfaz.

#### Scenario: error de validación en registro

- **WHEN** el registro falla por validación de un campo
- **THEN** el mensaje aparece asociado al campo cuando aplica, o como aviso general si no

#### Scenario: backend caído

- **WHEN** la interfaz no puede hablar con el servidor
- **THEN** se informa de que no hay conexión con el servidor

### Requirement: Navegación por defecto

Cualquier ruta desconocida SHALL llevar al perfil (y de ahí, si no hay sesión, al login).

#### Scenario: ruta inventada

- **WHEN** la persona abre una ruta que no existe
- **THEN** es enviada al perfil o, si no hay sesión, al login

---

## Parte B

### 1. Escritos vs comprobados

- Requisitos que escribió el agente: **10**
- Requisitos que comprobé abriendo el código: **7**

### 2. Incoherencias

- Al registrarse la contraseña exige entre 8 y 32 caracteres; al iniciar sesión la API solo exige que la contraseña sea un string no vacío (sin rango de longitud). Se ve en las reglas de validación de signup frente a las de login.
- Casi todas las respuestas de la API van envueltas en `{ data: ... }`, pero el logout responde con `{ message: ... }` suelto, sin ese envoltorio.
- Si al arrancar el backend no responde, la UI te deja como anónimo y enseña un error de sesión, pero el token sigue en el almacenamiento local (no se borra como cuando el servidor responde 401).

### 3. No supe decidir si era bug o contrato

- Cuando el servidor responde 400 en el login, la interfaz siempre dice que el email o la contraseña no son correctos. ¿Eso es el contrato de “cualquier 400 en login = credenciales malas”, o un atajo que enmascararía otros fallos 400 si aparecieran? Las dos lecturas encajan con el código y no hay nada que diga cuál es la intención.
- Tras un fallo de red al restaurar la sesión, te tratan como desconectado pero el token sigue guardado. ¿El contrato es “conservar el token para cuando vuelva el servidor” o “si no puedo validar, la sesión se acabó”? Depende de a quién preguntes.
