# Portal360 — Documentación de API
## Módulo de Empleado

> **Versión:** 1.0.0
> **Stack:** Java 21 · Spring Boot 3 · PostgreSQL
> **Base URL:** `/api`
> **Autenticación:** Bearer Token (JWT)

---

## Índice

1. [Ausencias / Solicitudes](#1-ausencias)
    - 1.1 [Calendario de Ausencias](#11-calendario-de-ausencias)
    - 1.2 [Creación de Solicitud](#12-creación-de-solicitud)
2. [Nóminas](#2-nominas)
    - 2.1 [Listado de Nóminas](#21-listado-de-nóminas)
    - 2.2 [Descarga Anual Masiva de Nóminas (ZIP)](#22-descarga-anual-masiva-de-nóminas-zip)
3. [Gestión de Archivos Binarios](#3-gestión-de-archivos-binarios)
   - 3.1 [Visualización Inline](#31-visualización-inline)
   - 3.2 [Descarga como Adjunto](#32-descarga-como-adjunto)

4. [Notas Técnicas](#4-notas-técnicas)

---

## 1. Ausencias / Solicitudes

### 1.1. Calendario de Ausencias

Devuelve los eventos de ausencia de un empleado para un año concreto, con el formato apropiado para su representación en un componente de calendario en el frontend.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/requests/calendar/me` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SI | Identificador del empleado. Mapeado a `empleado.id_empleado`. |

### Parámetros de Query

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `year` | `Integer` | SI | Año a consultar (ej. `2026`). Se usa con `EXTRACT(YEAR FROM fecha_inicio)` sobre la tabla `solicitud`. |

### Descripción Funcional

Consulta la tabla `solicitud` filtrando por `id_empleado` y extrayendo el año con funciones de fecha nativas de PostgreSQL (`EXTRACT` / `DATE_PART`). Solo se devuelven solicitudes cuya `fecha_inicio` pertenezca al año indicado. El resultado se mapea a una lista de `EventoCalendarioDTO`.

### Respuesta Exitosa `200 OK`

```json
{
    "year": 2026,
    "events": [{
        "date":"2026-08-01 00:00:00",
        "type":"Vacaciones",
        "name":"Vacaciones Agosto"
            }]
}
```

---

### 1.2. Creación de Solicitud

Crea una nueva solicitud de ausencia para el empleado autenticado. Acepta datos estructurados en JSON y, opcionalmente, un archivo adjunto como parte de un formulario multipart.

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/requests/create` |
| **Content-Type** | `multipart/form-data` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SI | Identificador del empleado al que se asocia la solicitud. |

### Partes del Formulario Multipart

| Parte | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `data` | `application/json` | SI | JSON con los datos de la solicitud
| `file` | `multipart/file` | NO | Archivo de soporte (PDF, imagen, etc.). Si se omite, la solicitud se crea sin adjunto. |

### Estructura del JSON `datos`

```json
{
  "idTipo": 1,
  "titulo": "Vacaciones Agosto",
  "descripcion": "Primera quincena de agosto",
  "fechaInicio": "01/08/2026",
  "fechaFin": "15/08/2026",
  "horaInicio": null,
  "horaFin": null
}
```

### Respuesta Exitosa `201 Created`

```json

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

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SI | Identificador del empleado. |

### Descripción Funcional

Consulta la tabla `documento` aplicando un filtro doble: `id_empleado = {idEmpleado}` y `id_tipo = 2` (correspondiente a `tipo_documento.nombre = 'Nómina'`). Realiza un JOIN con la tabla `archivo` para obtener los metadatos del fichero (`nombre_archivo`, `mime_type`, `tamano_bytes`). El resultado se mapea a una lista de DTOs.

### Respuesta Exitosa `200 OK`

```json

```

---

### 2.2. Descarga Anual Masiva de Nóminas (ZIP)

Genera y descarga un archivo ZIP dinámico que contiene todas las nóminas del empleado correspondientes a un año específico.

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/v1/empleados/{idEmpleado}/nominas/descargar-zip` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idEmployee` | `Integer` | SI | Identificador del empleado. |

### Parámetros de Query

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `year` | `Integer` | SI | Año de las nóminas a incluir en el ZIP (ej. `2026`). |

### Descripción Funcional

1. Consulta la tabla `documento` (con `id_tipo = 2`) filtrando por `id_empleado` y el año indicado usando `EXTRACT(YEAR FROM documento.created_at)`.
2. Realiza JOIN con `archivo` para obtener el `storage_key` y `nombre_archivo` de cada nómina.
3. Construye un ZIP en memoria (`ZipOutputStream`) añadiendo cada fichero como una entrada (`ZipEntry`) nombrada con `nombre_archivo`.
4. Sirve el ZIP como stream sin necesidad de almacenarlo en disco.

### Cabeceras de Respuesta

| Cabecera | Valor |
|---|---|
| `Content-Type` | `application/zip` |
| `Content-Disposition` | `attachment; filename="nominas_{idEmpleado}_{anio}.zip"` |

### Respuesta Exitosa `200 OK`

> Devuelve el stream binario del ZIP generado dinámicamente.

---

## 3. Gestión de Archivos Binarios

Endpoints para acceder al contenido binario de un archivo almacenado en el sistema. Ambos recuperan el fichero a partir de su `id_archivo`, resuelven el `storage_key` en la tabla `archivo` y sirven el contenido con el `mime_type` registrado.

### 3.1. Visualización Inline

Sirve el archivo directamente en el navegador (p. ej. para previsualizar un PDF sin descargarlo).

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/file/{idFile}/show` |
| **Autorización** | Bearer Token |

### Parámetros de Ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `idFile` | `Integer` | SI | Identificador del archivo en la tabla `archivo`. |

### Cabeceras de Respuesta

| Cabecera | Valor |
|---|---|
| `Content-Type` | Valor de `archivo.mime_type` (ej. `application/pdf`) |
| `Content-Disposition` | `inline; filename="<nombre_archivo>"` |

### Respuesta Exitosa `200 OK`

> Devuelve el contenido binario del archivo (`byte[]` / `Resource`). No aplica cuerpo JSON.

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
| `idFile` | `Integer` | SI | Identificador del archivo en la tabla `archivo`. |

### Cabeceras de Respuesta

| Cabecera | Valor |
|---|---|
| `Content-Type` | Valor de `archivo.mime_type` |
| `Content-Disposition` | `attachment; filename="<nombre_archivo>"` |

### Respuesta Exitosa `200 OK`

> Devuelve el contenido binario del archivo. El navegador lo trata como descarga directa.


---

## -- Notas Técnicas --

### DTOs (Data Transfer Objects)

Todos los endpoints de lectura devuelven DTOs, nunca entidades JPA directamente. Esto desacopla la capa de persistencia de la API y permite controlar exactamente qué campos se exponen.

| DTO | Endpoint asociado | Descripción |
|---|---|---|
| `EventoCalendarioDTO` | `GET /calendar` | Representa un evento de ausencia para el componente de calendario. Incluye título, tipo, estado y rango de fechas. |
| `SolicitudResponseDTO` | `POST /requests` | Confirmación de la solicitud creada con su `id_solicitud` generado. |
| `NominaDTO` | `GET /paysheet` | Metadatos del documento de nómina: `idFile`, `title`, `nameFile`, `dateEmission`. |

### Formato de Fechas

Todas las fechas se serializan y deserializan en formato `dd/MM/yyyy` en los cuerpos JSON. La configuración se aplica globalmente mediante `@JsonFormat(pattern = "dd/MM/yyyy")` en los campos de tipo `LocalDate` de los DTOs, o bien a través de la configuración global de `ObjectMapper` en el contexto de Spring.

```java
// Ejemplo de configuración en el DTO
@JsonFormat(pattern = "dd/MM/yyyy")
private LocalDate startDate;

@JsonFormat(pattern = "dd/MM/yyyy")
private LocalDate endDate;
```

### Gestión de Archivos mediante `storage_key`

Los archivos binarios **no se almacenan en la base de datos**. El flujo de gestión es el siguiente:

1. Al recibir un `MultipartFile`, el servidor genera un identificador único (`storage_key`) — por ejemplo, mediante `UUID.randomUUID()`.
2. El binario se persiste en el sistema de almacenamiento configurado (sistema de ficheros local, bucket S3, etc.) usando dicho `storage_key` como nombre/ruta.
3. En la tabla `archivo` se almacenan únicamente los **metadatos**: `storage_key`, `nombre_archivo`, `mime_type` y `tamano_bytes`. No se guarda el contenido binario en PostgreSQL.
4. Para servir un archivo (ver o descargar), el servicio recupera el `storage_key` de la tabla `archivo` y lo usa para leer el binario desde el almacenamiento, construyendo la respuesta HTTP con el `mime_type` apropiado.

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
| `400 Bad Request` | Validación fallida (fechas inválidas, campos obligatorios ausentes). |
| `403 Forbidden` | El empleado autenticado intenta acceder a recursos de otro empleado. |
| `404 Not Found` | El `idEmployee` o `idFile` indicado no existe en base de datos. |
| `500 Internal Server Error` | Error inesperado durante la generación del ZIP o escritura en almacenamiento. |