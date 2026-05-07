# Portal360 — Documentación de API
## Documentación Completa de Controladores

> **Versión:** 1.0.0
> **Stack:** Java 21 · Spring Boot 3 · PostgreSQL
> **Base URL:** `/api`
> **Autenticación:** Bearer Token (JWT)

---

## Índice

1. [Ausencias / Solicitudes](#1-ausencias--solicitudes)
   - 1.1 [Listado de Todas las Solicitudes](#11-listado-de-todas-las-solicitudes)
   - 1.2 [Calendario de Ausencias](#12-calendario-de-ausencias)
   - 1.3 [Creación de Solicitud](#13-creación-de-solicitud)
2. [Nóminas](#2-nóminas)
   - 2.1 [Listado de Nóminas](#21-listado-de-nóminas)
   - 2.2 [Descarga Anual Masiva de Nóminas (ZIP)](#22-descarga-anual-masiva-de-nóminas-zip)
3. [Gestión de Archivos Binarios](#3-gestión-de-archivos-binarios)
   - 3.1 [Visualización Inline](#31-visualización-inline)
   - 3.2 [Descarga como Adjunto](#32-descarga-como-adjunto)
4. [Documentos](#4-documentos)
   - 4.1 [Listado de Todos los Documentos](#41-listado-de-todos-los-documentos)
   - 4.2 [Documentos por Empleado](#42-documentos-por-empleado)
5. [Empleados](#5-empleados)
   - 5.1 [Listado de Todos los Empleados](#51-listado-de-todos-los-empleados)
   - 5.2 [Creación de Empleado](#52-creación-de-empleado)
6. [Fichajes](#6-fichajes)
   - 6.1 [Listado de Todos los Fichajes](#61-listado-de-todos-los-fichajes)
   - 6.2 [Fichajes por Empleado](#62-fichajes-por-empleado)
   - 6.3 [Registro de Entrada (Check-in)](#63-registro-de-entrada-check-in)
   - 6.4 [Registro de Salida (Check-out)](#64-registro-de-salida-check-out)
   - 6.5 [Fichajes por Rango de Fechas](#65-fichajes-por-rango-de-fechas)
7. [Notas Técnicas](#7-notas-técnicas)

---

## 1. Ausencias / Solicitudes

### 1.1. Listado de Todas las Solicitudes

Devuelve la lista completa de todas las solicitudes registradas en el sistema, sin filtrado por empleado. Endpoint orientado a uso administrativo (RRHH / ADMIN).

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/requests/all` |
| **Autorización** | Bearer Token |

### Descripción Funcional

Consulta la tabla `solicitud` sin aplicar ningún filtro, devolviendo todas las entidades mapeadas directamente. Incluye datos como `id_empleado`, `id_tipo`, `id_estado`, `titulo`, `descripcion`, `fecha_inicio`, `fecha_fin`, `hora_inicio` y `hora_fin`.

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idRequest": 1,
    "idEmployee": 2,
    "idType": 1,
    "idState": 1,
    "title": "Vacaciones Agosto",
    "description": "Primera quincena de agosto",
    "startDate": "2026-08-01",
    "endDate": "2026-08-15",
    "startHour": null,
    "endHour": null
  },
  {
    "idRequest": 2,
    "idEmployee": 3,
    "idType": 2,
    "idState": 1,
    "title": "Asuntos Propios",
    "description": "Salida para trámite bancario",
    "startDate": "2026-05-10",
    "endDate": "2026-05-10",
    "startHour": "10:00:00",
    "endHour": "12:30:00"
  }
]
```

---

### 1.2. Calendario de Ausencias

Devuelve los eventos de ausencia de un empleado para un año concreto, con el formato apropiado para su representación en un componente de calendario en el frontend.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/requests/calendar/me` |
| **Autorización** | Bearer Token |

### Parámetros de Query

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `year` | `Integer` | NO | Año a consultar (ej. `2026`). Si se omite, se usa el año en curso. |
| `idEmployee` | `Integer` | NO | Identificador del empleado. Si se omite, se usa el empleado de ejemplo (`id = 2`). En producción se obtiene del token JWT. |

### Descripción Funcional

Consulta la tabla `solicitud` filtrando por `id_empleado` y extrayendo el año con funciones de fecha nativas de PostgreSQL (`EXTRACT` / `DATE_PART`). Solo se devuelven solicitudes cuya `fecha_inicio` pertenezca al año indicado. El resultado se mapea a una lista de `EventoCalendarioDTO`.

### Caso de Prueba

```
GET /api/requests/calendar/me?year=2026&idEmployee=2
```

### Respuesta Exitosa `200 OK`

```json
{
  "year": 2026,
  "events": [
    {
      "date": "2026-08-01 00:00:00",
      "type": "Vacaciones",
      "name": "Vacaciones Agosto"
    }
  ]
}
```

---

### 1.3. Creación de Solicitud

Crea una nueva solicitud de ausencia para el empleado autenticado. Acepta datos estructurados en JSON y, opcionalmente, un archivo adjunto como parte de un formulario multipart.

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/requests/create` |
| **Content-Type** | `multipart/form-data` |
| **Autorización** | Bearer Token |

> **Nota:** Esta API está marcada como pendiente de revisión. La lógica de almacenamiento físico del archivo (`file.transferTo(...)`) está comentada en el código y debe implementarse antes de pasar a producción.

### Partes del Formulario Multipart

| Parte | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `data` | `application/json` | SÍ | JSON con los datos de la solicitud (ver estructura abajo). |
| `file` | `multipart/file` | NO | Archivo de soporte (PDF, imagen, etc.). Si se omite, la solicitud se crea sin adjunto. |

### Estructura del JSON `data`

```json
{
  "idType": "1",
  "comments": "Primera quincena de agosto",
  "startDate": "2026-08-01",
  "endDate": "2026-08-15"
}
```

### Descripción Funcional

1. Crea una entidad `Solicitud` con `id_estado = 1` (Pendiente) y `id_empleado = 2` (valor de ejemplo).
2. Persiste la solicitud en la tabla `solicitud`.
3. Si se adjunta un archivo, inserta su metadato en la tabla `archivo` con un `storage_key` generado mediante `UUID.randomUUID()`.
4. Crea la relación en la tabla `solicitud_adjunto` vinculando `id_solicitud` con `id_archivo`.
5. Toda la operación es transaccional (`@Transactional`): si cualquier paso falla, no se persiste nada.

### Respuesta Exitosa `200 OK`

```json
{
  "mensaje": "Solicitud y adjunto procesados con éxito",
  "idSolicitud": 3
}
```

### Respuesta de Error `500 Internal Server Error`

```json
{
  "error": "Error crítico al guardar: <mensaje de la excepción>"
}
```

---

## 2. Nóminas

### 2.1. Listado de Nóminas

Devuelve la lista de documentos de tipo **Nómina** asociados al empleado autenticado.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/paysheet/me` |
| **Autorización** | Bearer Token |

### Parámetros de Query

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | NO | Identificador del empleado. Si se omite, se usa el empleado de ejemplo (`id = 2`). |

### Descripción Funcional

Consulta la tabla `documento` aplicando un filtro doble: `id_empleado = {idEmpleado}` y `id_tipo = 2` (correspondiente a `tipo_documento.nombre = 'Nómina'`). Los resultados se ordenan por `created_at` descendente y se mapean a una lista de `NominaDTO`. Los campos `tipo` y `estado` devuelven valores fijos (`"Ordinaria"` y `"Disponible"`) a la espera de ser enriquecidos con datos reales.

### Caso de Prueba

```
GET /api/paysheet/me?idEmployee=2
```

### Respuesta Exitosa `200 OK`

```json
{
  "nominas": [
    {
      "idFile": 1,
      "title": "Nómina Mayo 2026",
      "period": "Nómina Mayo 2026",
      "type": "Ordinaria",
      "dateEmission": "01/05/2026",
      "state": "Disponible"
    }
  ]
}
```

---

### 2.2. Descarga Anual Masiva de Nóminas (ZIP)

Genera y descarga un archivo ZIP dinámico que contiene todas las nóminas del empleado correspondientes a un año específico.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/paysheet/download-year` |
| **Autorización** | Bearer Token |

### Parámetros de Query

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `anio` | `Integer` | SÍ | Año de las nóminas a incluir en el ZIP (ej. `2026`). |
| `idEmployee` | `Integer` | NO | Identificador del empleado. Si se omite, se usa el empleado de ejemplo (`id = 2`). |

### Descripción Funcional

1. Consulta la tabla `documento` (con `id_tipo = 2`) filtrando por `id_empleado`. El filtro por año se aplica en Java con `.filter(d -> d.getCreatedAt().getYear() == anio)`.
2. Por cada documento, recupera el `storage_key` y `nombre_archivo` de la tabla `archivo`.
3. Construye un ZIP en streaming (`ZipOutputStream`) añadiendo cada fichero como una `ZipEntry` nombrada con `nombre_archivo`.
4. Sirve el ZIP directamente en la respuesta HTTP sin almacenarlo en disco.

### Cabeceras de Respuesta

| Cabecera | Valor |
|---|---|
| `Content-Type` | `application/zip` |
| `Content-Disposition` | `attachment; filename="Nominas_{anio}.zip"` |

### Caso de Prueba

```
GET /api/paysheet/download-year?anio=2026&idEmployee=2
```

### Respuesta Exitosa `200 OK`

> Devuelve el stream binario del ZIP generado dinámicamente con las nóminas del año indicado.

---

## 3. Gestión de Archivos Binarios

Endpoints para acceder al contenido binario de un archivo almacenado en el sistema. Ambos recuperan el fichero a partir de su `id_archivo`, resuelven el `storage_key` en la tabla `archivo` y sirven el contenido con el `mime_type` registrado.

>  **Nota:** Esta API está marcada como pendiente de revisión. Actualmente resuelve los archivos desde la ruta física del sistema de ficheros usando `storage_key` como ruta absoluta. Revisar antes de pasar a producción.

### 3.1. Visualización Inline

Sirve el archivo directamente en el navegador (ej. para previsualizar un PDF sin descargarlo).

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/file/{idFile}/show` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idFile` | `Long` | SÍ | Identificador del archivo en la tabla `archivo`. |

### Cabeceras de Respuesta

| Cabecera | Valor |
|---|---|
| `Content-Type` | Valor de `archivo.mime_type` (ej. `application/pdf`) |
| `Content-Disposition` | `inline; filename="<nombre_archivo>"` |

### Caso de Prueba

```
GET /api/file/1/show
```

> Usando el archivo de prueba con `id_archivo = 1` (`solicitud_vacaciones.pdf`, `mime_type = application/pdf`).

### Respuesta Exitosa `200 OK`

> Devuelve el contenido binario del archivo. El navegador lo muestra en línea si el tipo MIME lo permite (ej. PDF, imagen).

### Respuesta de Error `500 Internal Server Error`

> Se devuelve si el archivo no existe en el disco o si hay un error al leer el recurso.

---

### 3.2. Descarga como Adjunto

Fuerza la descarga del archivo en el navegador del cliente.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/file/{idFile}/download` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idFile` | `Long` | SÍ | Identificador del archivo en la tabla `archivo`. |

### Cabeceras de Respuesta

| Cabecera | Valor |
|---|---|
| `Content-Type` | Valor de `archivo.mime_type` |
| `Content-Disposition` | `attachment; filename="<nombre_archivo>"` |

### Caso de Prueba

```
GET /api/file/1/download
```

> Usando el archivo de prueba con `id_archivo = 1` (`solicitud_vacaciones.pdf`).

### Respuesta Exitosa `200 OK`

> Devuelve el contenido binario del archivo. El navegador lo trata como descarga directa.

---

## 4. Documentos

### 4.1. Listado de Todos los Documentos

Devuelve la lista completa de documentos registrados en el sistema, sin filtrado por empleado ni por tipo.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/documents` |
| **Autorización** | Bearer Token |

### Descripción Funcional

Consulta la tabla `documento` sin filtros, devolviendo todas las entidades disponibles. Incluye contratos, nóminas y cualquier otro tipo registrado en `tipo_documento`.

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idDocument": 1,
    "idEmployee": 2,
    "idType": 2,
    "idFile": 1,
    "title": "Nómina Mayo 2026",
    "createdAt": "2026-05-01T00:00:00"
  }
]
```

---

### 4.2. Documentos por Empleado

Devuelve todos los documentos asociados a un empleado concreto, independientemente del tipo de documento.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/documents/{idEmployee}` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SÍ | Identificador del empleado. Mapeado a `documento.id_empleado`. |

### Descripción Funcional

Consulta la tabla `documento` filtrando por `id_empleado`. Devuelve tanto contratos (`id_tipo = 1`) como nóminas (`id_tipo = 2`) y cualquier otro tipo configurado.

### Caso de Prueba

```
GET /api/documents/2
```

> Devuelve todos los documentos del empleado Lucía Sanz Castro (`id_empleado = 2`).

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idDocument": 1,
    "idEmployee": 2,
    "idType": 2,
    "idFile": 1,
    "title": "Nómina Mayo 2026",
    "createdAt": "2026-05-01T00:00:00"
  }
]
```

---

## 5. Empleados

### 5.1. Listado de Todos los Empleados

Devuelve la lista completa de empleados registrados en el sistema.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/employees/all` |
| **Autorización** | Bearer Token |

### Descripción Funcional

Consulta la tabla `empleado` sin filtros y devuelve todas las entidades. Incluye datos personales como `dni`, `nombre`, `apellidos`, `fecha_nacimiento`, `telefono` y el flag `activo`.

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idEmployee": 1,
    "idUsuario": 2,
    "dni": "22222222B",
    "nombre": "Lucía",
    "apellidos": "Sanz Castro",
    "fechaNacimiento": "1990-01-10",
    "telefono": "611000001",
    "activo": true
  },
  {
    "idEmployee": 2,
    "idUsuario": 3,
    "dni": "33333333C",
    "nombre": "Marcos",
    "apellidos": "López Ruiz",
    "fechaNacimiento": "1985-11-25",
    "telefono": "611000002",
    "activo": true
  },
  {
    "idEmployee": 3,
    "idUsuario": 4,
    "dni": "44444444D",
    "nombre": "Elena",
    "apellidos": "Belmonte Gil",
    "fechaNacimiento": "1993-07-14",
    "telefono": "611000003",
    "activo": true
  }
]
```

---

### 5.2. Creación de Empleado

Crea un nuevo registro de empleado en el sistema.

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/employees` |
| **Content-Type** | `application/json` |
| **Autorización** | Bearer Token |

### Cuerpo de la Petición (`application/json`)

```json
{
  "idUsuario": 5,
  "dni": "55555555E",
  "nombre": "Carlos",
  "apellidos": "García Martín",
  "fechaNacimiento": "1988-03-22",
  "telefono": "611000004"
}
```

### Descripción Funcional

Persiste la entidad `Empleado` en la tabla `empleado` usando `JpaRepository.save()`. El campo `activo` se establece a `true` por defecto según la definición de la tabla en la base de datos. El campo `created_at` y `updated_at` se asignan automáticamente por el servidor de base de datos.

### Respuesta Exitosa `200 OK`

```json
{
  "idEmployee": 4,
  "idUsuario": 5,
  "dni": "55555555E",
  "nombre": "Carlos",
  "apellidos": "García Martín",
  "fechaNacimiento": "1988-03-22",
  "telefono": "611000004",
  "activo": true
}
```

---

## 6. Fichajes

### 6.1. Listado de Todos los Fichajes

Devuelve la lista completa de fichajes registrados en el sistema, sin filtrado por empleado.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/clockings` |
| **Autorización** | Bearer Token |

### Descripción Funcional

Consulta la tabla `fichaje` sin filtros y devuelve todas las entidades. Incluye datos como `id_empleado`, `tipo` (ENTRADA / SALIDA), `hora_inicio`, `hora_fin` y `fecha`.

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idClocking": 1,
    "idEmployee": 2,
    "type": "ENTRADA",
    "startHour": "09:00:00",
    "endHour": null,
    "date": "2026-05-10"
  },
  {
    "idClocking": 2,
    "idEmployee": 2,
    "type": "SALIDA",
    "startHour": null,
    "endHour": "18:00:00",
    "date": "2026-05-10"
  }
]
```

---

### 6.2. Fichajes por Empleado

Devuelve todos los fichajes asociados a un empleado concreto.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/clockings/employee/{idEmployee}` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SÍ | Identificador del empleado. Mapeado a `fichaje.id_empleado`. |

### Caso de Prueba

```
GET /api/clockings/employee/2
```

> Devuelve todos los fichajes del empleado Lucía Sanz Castro (`id_empleado = 2`).

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idClocking": 1,
    "idEmployee": 2,
    "type": "ENTRADA",
    "startHour": "09:00:00",
    "endHour": null,
    "date": "2026-05-10"
  },
  {
    "idClocking": 2,
    "idEmployee": 2,
    "type": "SALIDA",
    "startHour": null,
    "endHour": "18:00:00",
    "date": "2026-05-10"
  }
]
```

---

### 6.3. Registro de Entrada (Check-in)

Registra la hora de entrada de un empleado en el momento exacto de la llamada.

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/clockings/check-in` |
| **Content-Type** | `application/json` |
| **Autorización** | Bearer Token |

### Cuerpo de la Petición (`application/json`)

```json
{
  "idEmployee": 2
}
```

### Descripción Funcional

Recibe una entidad `Fichaje` parcial (solo `id_empleado`). El controlador asigna automáticamente:
- `tipo = ENTRADA`
- `hora_inicio = LocalTime.now()` (hora del servidor en el momento de la llamada)
- `fecha = LocalDate.now()` (fecha del servidor en el momento de la llamada)

Persiste el registro en la tabla `fichaje` y devuelve la entidad completa guardada.

### Respuesta Exitosa `200 OK`

```json
{
  "idClocking": 3,
  "idEmployee": 2,
  "type": "ENTRADA",
  "startHour": "10:32:45",
  "endHour": null,
  "date": "2026-05-06"
}
```

---

### 6.4. Registro de Salida (Check-out)

Actualiza un fichaje existente registrando la hora de salida del empleado.

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/clockings/check-out/{id}` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | `Integer` | SÍ | Identificador del fichaje de entrada (`fichaje.id_fichaje`) que se desea cerrar. |

### Descripción Funcional

Busca el fichaje por `id_fichaje`. Si existe, actualiza los siguientes campos:
- `tipo = SALIDA`
- `hora_fin = LocalTime.now()` (hora del servidor en el momento de la llamada)

Persiste los cambios en la tabla `fichaje`.

### Caso de Prueba

```
POST /api/clockings/check-out/1
```

> Cierra el fichaje de entrada con `id_fichaje = 1` del empleado Lucía Sanz Castro.

### Respuesta Exitosa `200 OK`

```json
{
  "idClocking": 1,
  "idEmployee": 2,
  "type": "SALIDA",
  "startHour": "09:00:00",
  "endHour": "18:15:30",
  "date": "2026-05-10"
}
```

### Respuesta de Error `404 Not Found`

> Se devuelve si el `id` del fichaje no existe en la base de datos.

---

### 6.5. Fichajes por Rango de Fechas

Devuelve todos los fichajes de un empleado comprendidos dentro de un rango de fechas específico.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/clockings/employee/{idEmployee}/range` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SÍ | Identificador del empleado. Mapeado a `fichaje.id_empleado`. |

### Parámetros de Query

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `startDate` | `LocalDate` | SÍ | Fecha de inicio del rango (formato `yyyy-MM-dd`). |
| `endDate` | `LocalDate` | SÍ | Fecha de fin del rango (formato `yyyy-MM-dd`). |

### Descripción Funcional

Consulta la tabla `fichaje` filtrando por `id_empleado` y aplicando el rango de fechas mediante `BETWEEN` sobre el campo `fecha`. La lógica de filtrado es delegada al repositorio mediante el método `findByIdEmployeeAndDateBetween`.

### Caso de Prueba

```
GET /api/clockings/employee/2/range?startDate=2026-05-01&endDate=2026-05-31
```

> Devuelve todos los fichajes del empleado Lucía Sanz Castro durante el mes de mayo de 2026.

### Respuesta Exitosa `200 OK`

```json
[
  {
    "idClocking": 1,
    "idEmployee": 2,
    "type": "ENTRADA",
    "startHour": "09:00:00",
    "endHour": null,
    "date": "2026-05-10"
  },
  {
    "idClocking": 2,
    "idEmployee": 2,
    "type": "SALIDA",
    "startHour": null,
    "endHour": "18:00:00",
    "date": "2026-05-10"
  }
]
```

---

## 7. Notas Técnicas

### DTOs (Data Transfer Objects)

Todos los endpoints de lectura devuelven DTOs, nunca entidades JPA directamente. Esto desacopla la capa de persistencia de la API y permite controlar exactamente qué campos se exponen.

| DTO | Endpoint asociado | Descripción |
|---|---|---|
| `EventoCalendarioDTO` | `GET /requests/calendar/me` | Representa un evento de ausencia para el componente de calendario. Incluye nombre, tipo y fecha de inicio. |
| `SolicitudRequestDTO` | `POST /requests/create` | DTO de entrada para la creación de solicitudes. Contiene `idType`, `comments`, `startDate` y `endDate`. |
| `NominaDTO` | `GET /paysheet/me` | Metadatos del documento de nómina: `idFile`, `title`, `period`, `type`, `dateEmission`, `state`. |

### Datos de Prueba Disponibles en BD

| Entidad | ID | Descripción |
|---|---|---|
| `empleado` | 1 | Lucía Sanz Castro — HR Specialist |
| `empleado` | 2 | Marcos López Ruiz — Developer |
| `empleado` | 3 | Elena Belmonte Gil — Manager |
| `solicitud` | 1 | Vacaciones Agosto (empleado 2, estado Pendiente) |
| `solicitud` | 2 | Asuntos Propios (empleado 3, estado Pendiente) |
| `archivo` | 1 | `solicitud_vacaciones.pdf` — `application/pdf` |
| `fichaje` | 1 | ENTRADA 09:00 — empleado 2, fecha 2026-05-10 |
| `fichaje` | 2 | SALIDA 18:00 — empleado 2, fecha 2026-05-10 |
| `tipo_documento` | 1 | Contrato |
| `tipo_documento` | 2 | Nómina |
| `tipo_solicitud` | 1 | Vacaciones |
| `tipo_solicitud` | 2 | Horas Libres |
| `estado_solicitud` | 1 | Pendiente |
| `estado_solicitud` | 2 | Aprobada |

### Formato de Fechas

Las fechas de los cuerpos JSON se serializan y deserializan en formato `dd/MM/yyyy`. La configuración se aplica globalmente mediante `@JsonFormat(pattern = "dd/MM/yyyy")` en los campos de tipo `LocalDate` de los DTOs, o bien a través de la configuración global de `ObjectMapper` en el contexto de Spring.

```java
@JsonFormat(pattern = "dd/MM/yyyy")
private LocalDate startDate;

@JsonFormat(pattern = "dd/MM/yyyy")
private LocalDate endDate;
```

> **Excepción:** Los parámetros de query como `startDate` y `endDate` en el endpoint de fichajes por rango se reciben en formato `yyyy-MM-dd` (formato ISO estándar de `LocalDate`).

### Gestión de Archivos mediante `storage_key`

Los archivos binarios **no se almacenan en la base de datos**. El flujo de gestión es el siguiente:

1. Al recibir un `MultipartFile`, el servidor genera un `storage_key` único mediante `UUID.randomUUID()`.
2. El binario debe persistirse en el sistema de almacenamiento configurado (sistema de ficheros local, bucket S3, etc.) usando dicho `storage_key` como nombre/ruta. *(Pendiente de implementar en `SolicitudController`.)*
3. En la tabla `archivo` se almacenan únicamente los **metadatos**: `storage_key`, `nombre_archivo`, `mime_type` y `tamano_bytes`.
4. Para servir un archivo, el servicio recupera el `storage_key` de la tabla `archivo` y lo usa para leer el binario desde el almacenamiento.

```
[Cliente] → POST multipart → [Spring Controller]
                                       ↓
                          [Servicio guarda binario]  →  [Almacenamiento (S3 / disco)]
                                       ↓
                          [BD: INSERT en archivo (storage_key, mime_type, ...)]
                                       ↓
                          [BD: INSERT en solicitud_adjunto (id_solicitud, id_archivo)]
```

### Manejo de Errores Comunes

| Código HTTP | Causa |
|---|---|
| `400 Bad Request` | Validación fallida (fechas inválidas, campos obligatorios ausentes, violación del constraint `check_fechas_horas`). |
| `403 Forbidden` | El empleado autenticado intenta acceder a recursos de otro empleado. |
| `404 Not Found` | El `idEmployee`, `idFile` o `idClocking` indicado no existe en base de datos. |
| `500 Internal Server Error` | Error inesperado durante la generación del ZIP, escritura en almacenamiento, o lectura de archivo físico. |

### CORS

Todos los controladores tienen configurado `@CrossOrigin(origins = "*")`, permitiendo peticiones desde cualquier origen. **Revisar y restringir a los orígenes permitidos antes de pasar a producción.**

### Autenticación

Los endpoints están preparados para recibir un Bearer Token (JWT) en la cabecera `Authorization`. Sin embargo, la lógica de extracción del `id_empleado` desde el token **no está implementada aún**: actualmente se usa un valor fijo (`id = 2`) como empleado de ejemplo en los endpoints de solicitudes y nóminas.
