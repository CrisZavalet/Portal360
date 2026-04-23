# Portal360 — Backend

## ¿Qué es el backend y para qué sirve?

El backend es la parte del proyecto que gestiona toda la lógica y los datos. Básicamente, cuando el usuario inicia sesión, ficha su entrada o consulta sus nóminas, es el backend el que recibe esa petición, consulta la base de datos y devuelve la respuesta.

Está desarrollado con **Spring Boot**, un framework de Java bastante estándar en el mundo empresarial para construir APIs REST.

---

## Cómo se creó el proyecto

El proyecto se generó desde **Spring Initializr** ([start.spring.io](https://start.spring.io)), que es una herramienta oficial de Spring que te genera automáticamente la estructura base del proyecto. Solo tienes que rellenar un formulario y te descarga un ZIP listo para usar.

La configuración que se usó fue esta:

| Campo | Valor | ¿Por qué? |
|-------|-------|-----------|
| Project | Maven | Gestiona las dependencias y la compilación del proyecto |
| Language | Java | El lenguaje del backend |
| Spring Boot | 4.0.5 | La versión del framework |
| Group | com.portal | Es el identificador del paquete raíz en Java |
| Artifact | portal360 | El nombre del proyecto |
| Packaging | Jar | El formato de empaquetado para ejecutar la aplicación |
| Java | 21 | La versión de Java que se usa |

Las dependencias que se añadieron (es decir, las librerías que el proyecto necesita):

- **Spring Web** → para crear los endpoints de la API y recibir peticiones HTTP
- **Spring Data JPA** → para interactuar con la base de datos sin escribir SQL a mano
- **PostgreSQL Driver** → el conector específico para PostgreSQL
- **Lombok** → genera getters, setters y constructores automáticamente, así no tienes que escribirlos
- **Spring Security** → para gestionar la autenticación y la seguridad

Una vez descargado el ZIP, se descomprimió y se subió al repositorio:

```bash
git add .
git commit -m "crear proyecto Spring Boot base"
git push origin nombreRama
```

---

## Qué necesitas instalar

### Java JDK 21
Es el lenguaje en el que está escrito el backend, sin él no funciona nada.

Para comprobar que está bien instalado, abre una terminal y escribe:
```bash
java -version
```
Si ves algo como `java version "21.x.x"` es que está bien.

### PostgreSQL 18 + pgAdmin
PostgreSQL es la base de datos del proyecto. pgAdmin es la interfaz gráfica para manejarla, algo así como el explorador visual de la base de datos.

> ⚠️ Durante la instalación te pide una contraseña. Apúntala, la vas a necesitar varias veces.

### Visual Studio Code + Extension Pack for Java
VSCode es el editor. La extensión de Java es necesaria para que entienda y pueda ejecutar el código.

Una vez instalado VSCode, ve al panel de extensiones (icono de cuadraditos a la izquierda), busca `Extension Pack for Java` e instálala.

### Git
Para clonar el repositorio y subir cambios.

---

## Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/CrisZavalet/Portal360.git
cd Portal360
git checkout TuRama
```

- `git clone` descarga el proyecto en tu ordenador
- `cd Portal360` entra en la carpeta
- `git checkout TuRama` cambia a tu rama de trabajo

> Antes de ponerte a trabajar cada día, haz `git pull` para tener los últimos cambios y no generar conflictos.

---

## Paso 2 — Crear la base de datos

El backend necesita una base de datos en tu ordenador para funcionar. Hay que crearla manualmente la primera vez.

1. Abre **pgAdmin 4**
2. Conéctate con la contraseña que pusiste al instalar PostgreSQL
3. Clic derecho en **Databases** → **Create** → **Database**
4. Ponle el nombre `portal360` y guarda

---

## Paso 3 — Cargar las tablas

La base de datos que acabas de crear está vacía, hay que meterle las tablas y los datos de prueba.

1. Clic derecho sobre `portal360` → **Query Tool**
2. Abre el archivo `Docs/portal360_db_pruebas.sql` con el icono de carpeta 📁
3. Pulsa **F5** para ejecutarlo
4. En la pestaña **Messages** tiene que salir `Query returned successfully` ✅

> Los mensajes de `NOTICE: la tabla X no existe, omitiendo` son normales, no te preocupes.

---

## Paso 4 — Configurar la conexión a la base de datos

Hay que decirle al backend cómo conectarse a tu base de datos local. Esto se hace en el archivo:

```
Backend/portal360/src/main/resources/application.properties
```

Tiene que quedar así:

```properties
spring.application.name=portal360

# Ruta de tu base de datos local
spring.datasource.url=jdbc:postgresql://localhost:5432/portal360
# Usuario por defecto de PostgreSQL
spring.datasource.username=postgres
# Tu contraseña de PostgreSQL
spring.datasource.password=TU_CONTRASEÑA

# Actualiza las tablas automáticamente si hay cambios en los modelos
spring.jpa.hibernate.ddl-auto=update
# Muestra las consultas SQL en la consola, útil para ver qué está pasando
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Cambia `TU_CONTRASEÑA` por la tuya y guarda con **Ctrl+S**.

---

## Paso 5 — Arrancar el backend

Abre una terminal, entra en la carpeta del proyecto y ejecuta:

```bash
cd Backend/portal360
mvnw.cmd spring-boot:run
```

La primera vez tarda un poco porque descarga todas las dependencias. Cuando veas esto ya está listo:

```
Tomcat started on port 8080
Started Portal360Application in X seconds
```

> No cierres esa terminal mientras estés trabajando, el servidor se para si la cierras.

---

## Paso 6 — Verificar que funciona

Abre el navegador y entra en:

```
http://localhost:8080/api/fichaje
```

Si aparece un JSON con datos de fichajes, todo está correcto. ✅

---

## Estructura del proyecto

```
Backend/
└── portal360/
    └── src/main/java/com/portal/portal360/
        ├── config/
        │   └── SecurityConfig.java       → Configuración de seguridad
        ├── controller/
        │   ├── AuthController.java       → Endpoints de login
        │   └── FichajeController.java    → Endpoints de fichaje
        ├── model/
        │   ├── Usuario.java              → Modelo de la tabla usuario
        │   ├── Empleado.java             → Modelo de la tabla empleado
        │   └── Fichaje.java              → Modelo de la tabla fichaje
        └── repository/
            ├── UsuarioRepository.java    → Consultas sobre usuarios
            ├── EmpleadoRepository.java   → Consultas sobre empleados
            └── FichajeRepository.java    → Consultas sobre fichajes
```

---

## Endpoints disponibles

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login con email y contraseña |

### Fichaje
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/fichaje` | Devuelve todos los fichajes |
| POST | `/api/fichaje/entrada` | Registra la entrada de un empleado |
| POST | `/api/fichaje/salida/{id}` | Registra la salida de un empleado |
| GET | `/api/fichaje/historial/{empleadoId}` | Historial de fichajes por empleado |

---

## Si algo no funciona

**Puerto 8080 ocupado**

Pasa cuando el servidor ya está corriendo de antes y no lo cerraste. Para liberarlo:

```bash
netstat -ano | findstr :8080
taskkill /PID <el número que aparece> /F
```

Y luego vuelves a ejecutar `mvnw.cmd spring-boot:run`.
