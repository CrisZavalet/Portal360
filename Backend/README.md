# Portal360 — Backend

Sistema de gestión de empleados y fichajes desarrollado con **Spring Boot**. Esta guía está orientada a que cualquier desarrollador del equipo pueda levantar el entorno de desarrollo local de forma rápida y sin problemas.

---

## Requisitos Previos

Antes de clonar o ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

| Herramienta | Versión recomendada | Enlace de descarga                                  |
| ----------- | ------------------- | --------------------------------------------------- |
| Java (JDK)  | 21                  | https://www.oracle.com/java/technologies/downloads/ |
| Maven       | 3.9+                | https://maven.apache.org/download.cgi               |
| PostgreSQL  | 18.3                | https://www.postgresql.org/download/                |
| pgAdmin     | Cualquier versión   | https://www.pgadmin.org/download/                   |

> **Nota:** Verifica tu versión de Java ejecutando `java -version` en tu terminal. Debe mostrar `openjdk 21` o superior.

---

## Configuración de la Base de Datos

### 1. Crear la base de datos en pgAdmin

1. Abre **pgAdmin** y conéctate a tu servidor PostgreSQL local.
2. Haz clic derecho sobre `Databases` → `Create` → `Database...`
3. Asigna el nombre (sugerido):

```
portal360_db
```

4. Haz clic en **Save**.

### 2. Ejecutar el script de pruebas

Una vez creada la base de datos, ejecuta el script SQL incluido en el repositorio para generar la estructura completa de tablas y los datos de prueba:

**Archivo:** `portal360_db_pruebas.sql`

**Contenido del script:**

- Tablas de `usuarios`, `empleados`, `roles` y `fichajes`
- Datos de prueba listos para usar desde el primer arranque

**Pasos para ejecutarlo:**

1. En pgAdmin, selecciona la base de datos `portal360_db`.
2. Abre la herramienta de consultas: `Tools` → `Query Tool`.
3. Carga el archivo: `File` → `Open File...` → selecciona `portal360_db_pruebas.sql`.
4. Ejecuta con `F5`.

---

## Configuración del Proyecto

Los parámetros de conexión a la base de datos se gestionan en el archivo:

```
src/main/resources/application.properties
```

### Contenido de referencia

```properties
# Conexión a la base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/portal360_db
spring.datasource.username=postgres
spring.datasource.password=TU_CONTRASEÑA_AQUI

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

> **Importante:** Reemplaza el valor de `spring.datasource.password` con la contraseña de tu instalación local de PostgreSQL. No subas este archivo con credenciales reales al repositorio.

---

## Seguridad y APIs

### Estado actual de la seguridad

La seguridad está configurada temporalmente en modo **`permitAll`** a través de la clase `SecurityConfig.java`. Esto significa que **todos los endpoints son accesibles sin autenticación** durante la fase inicial de desarrollo, esto facilita las pruebas con herramientas como Postman o cURL.

```java
// SecurityConfig.java (configuración temporal de desarrollo)
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()
        );
    return http.build();
}
```

> **Importante:** Esta configuración deberá reemplazarse por autenticación basada en JWT antes del despliegue a producción.

---

## Instrucciones de Ejecución

### Opción 1 — Desde la terminal (Maven Wrapper)

En la raíz del proyecto, ejecuta:

```bash
./mvnw spring-boot:run
```

> En Windows usa:
>
> ```cmd
> mvnw.cmd spring-boot:run
> ```

Si la aplicación arranca correctamente, verás en consola una línea similar a:

```
Started Portal360Application in 3.421 seconds (process running for 3.8)
```

La API estará disponible en: **`http://localhost:8080`**

---

### Opción 2 — Desde Visual Studio Code

1. Abre la carpeta raíz del proyecto en VS Code.
2. Instala la extensión **Extension Pack for Java** .
3. Abre el archivo `Portal360Application.java` ubicado en:
   ```
   src/main/java/com/portal/portal360/Portal360Application.java
   ```
4. Haz clic en el botón **Run**.

> **Recomendación:** Instalar extensión de VS Code `Spring Boot Dashboard`, facilita el arranque del proyecto, de igual manera muestra resumen de endpoints y beans con los que cuenta.

---

### Opción 3 — Compilar y ejecutar el JAR manualmente

```bash
# Compilar el proyecto
./mvnw clean package -DskipTests

# Ejecutar el JAR generado
java -jar target/portal360-0.0.1-SNAPSHOT.jar
```

---

## Notas Técnicas

### Dependencias clave

- **Lombok** — Se utiliza para reducir código repetitivo (getters, setters, constructores y builders) mediante anotaciones como `@Data`, `@Getter`, `@Builder`, etc. Asegúrate de tener instalado el **plugin de Lombok** en tu IDE:
  - VS Code: extensión `Lombok Annotations Support for VS Code`

### Arquitectura de carpetas

El proyecto sigue una arquitectura en capas estándar de Spring Boot:

```
src/main/java/com/portal/portal360/
│
├── controller/         # Controladores REST (@RestController)
│   ├── EmpleadoController.java
│   └── AuthController.java
│
├── model/              # Entidades JPA (@Entity)
│   ├── Empleado.java
│   ├── Usuario.java
│   ├── Rol.java
│   └── Fichaje.java
│
├── repository/         # Interfaces de acceso a datos (JpaRepository)
│   ├── EmpleadoRepository.java
│   └── UsuarioRepository.java
│
├── service/            # Lógica de negocio (@Service)
│
├── config/             # Configuraciones (@Configuration)
│   └── SecurityConfig.java
│
└── Portal360Application.java   # Punto de entrada principal
```

---
