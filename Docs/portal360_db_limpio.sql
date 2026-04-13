-- Base de datos Portal360
-- Creado por Laila
--PostgreSQL 18.3
-- Eliminar tablas si existen (en orden por dependencias)
DROP TABLE IF EXISTS solicitud_adjunto CASCADE;
DROP TABLE IF EXISTS solicitud_historial CASCADE;
DROP TABLE IF EXISTS solicitud CASCADE;
DROP TABLE IF EXISTS estado_solicitud CASCADE;
DROP TABLE IF EXISTS tipo_solicitud CASCADE;
DROP TABLE IF EXISTS documento CASCADE;
DROP TABLE IF EXISTS tipo_documento CASCADE;
DROP TABLE IF EXISTS archivo CASCADE;
DROP TABLE IF EXISTS fichaje CASCADE;
DROP TABLE IF EXISTS empleado_puesto CASCADE;
DROP TABLE IF EXISTS puesto CASCADE;
DROP TABLE IF EXISTS empleado CASCADE;
DROP TABLE IF EXISTS usuario_rol CASCADE;
DROP TABLE IF EXISTS rol CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

-- =============================================
-- TABLA: usuario
-- =============================================
CREATE TABLE usuario (
    id_usuario    SERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT         NOT NULL,
    activo        BOOLEAN      DEFAULT TRUE,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: rol
-- =============================================
CREATE TABLE rol (
    id_rol     SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE,
    activo     BOOLEAN      DEFAULT TRUE
);

-- =============================================
-- TABLA: usuario_rol
-- =============================================
CREATE TABLE usuario_rol (
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_rol     INT NOT NULL REFERENCES rol(id_rol) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_rol)
);

-- =============================================
-- TABLA: empleado
-- =============================================
CREATE TABLE empleado (
    id_empleado      SERIAL PRIMARY KEY,
    id_usuario       INT          UNIQUE REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    dni              VARCHAR(20)  NOT NULL UNIQUE,
    nombre           VARCHAR(100),
    apellidos        VARCHAR(150),
    fecha_nacimiento DATE,
    telefono         VARCHAR(20),
    activo           BOOLEAN      DEFAULT TRUE,
    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: puesto
-- =============================================
CREATE TABLE puesto (
    id_puesto SERIAL PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL UNIQUE,
    activo    BOOLEAN      DEFAULT TRUE
);

-- =============================================
-- TABLA: empleado_puesto
-- =============================================
CREATE TABLE empleado_puesto (
    id_empleado_puesto SERIAL PRIMARY KEY,
    id_empleado        INT  NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    id_puesto          INT  NOT NULL REFERENCES puesto(id_puesto) ON DELETE CASCADE,
    fecha_inicio       DATE,
    fecha_fin          DATE
);

-- =============================================
-- TABLA: fichaje
-- =============================================
CREATE TABLE fichaje (
    id_fichaje  SERIAL PRIMARY KEY,
    id_empleado INT         NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    tipo        VARCHAR(10) CHECK (tipo IN ('ENTRADA', 'SALIDA')),
    fecha_hora  TIMESTAMP,
    created_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: tipo_documento
-- =============================================
CREATE TABLE tipo_documento (
    id_tipo INT  PRIMARY KEY,
    nombre  VARCHAR(100) NOT NULL UNIQUE
);

-- =============================================
-- TABLA: archivo
-- =============================================
CREATE TABLE archivo (
    id_archivo     SERIAL PRIMARY KEY,
    storage_key    VARCHAR(255) UNIQUE,
    nombre_archivo VARCHAR(255),
    mime_type      VARCHAR(100),
    tamano_bytes   BIGINT,
    creado_por     INT       REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: documento
-- =============================================
CREATE TABLE documento (
    id_documento INT       PRIMARY KEY,
    id_empleado  INT       NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    id_tipo      INT       NOT NULL REFERENCES tipo_documento(id_tipo),
    id_archivo   INT       NOT NULL REFERENCES archivo(id_archivo),
    titulo       VARCHAR(255),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: tipo_solicitud
-- =============================================
CREATE TABLE tipo_solicitud (
    id_tipo INT          PRIMARY KEY,
    nombre  VARCHAR(100) NOT NULL UNIQUE
);

-- =============================================
-- TABLA: estado_solicitud
-- =============================================
CREATE TABLE estado_solicitud (
    id_estado INT          PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL UNIQUE
);

-- =============================================
-- TABLA: solicitud
-- =============================================
CREATE TABLE solicitud (
    id_solicitud      SERIAL PRIMARY KEY,
    id_empleado       INT       NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    id_tipo           INT       NOT NULL REFERENCES tipo_solicitud(id_tipo),
    id_estado         INT       NOT NULL REFERENCES estado_solicitud(id_estado),
    titulo            VARCHAR(255),
    descripcion       TEXT,
    fecha_resolucion  TIMESTAMP,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: solicitud_historial
-- =============================================
CREATE TABLE solicitud_historial (
    id_historial  SERIAL PRIMARY KEY,
    id_solicitud  INT         NOT NULL REFERENCES solicitud(id_solicitud) ON DELETE CASCADE,
    id_usuario    INT         NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_estado     INT         NOT NULL REFERENCES estado_solicitud(id_estado),
    accion        VARCHAR(20) CHECK (accion IN ('CREADA', 'APROBADA', 'RECHAZADA')),
    comentario    TEXT,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: solicitud_adjunto
-- =============================================
CREATE TABLE solicitud_adjunto (
    id_adjunto   SERIAL PRIMARY KEY,
    id_solicitud INT NOT NULL REFERENCES solicitud(id_solicitud) ON DELETE CASCADE,
    id_archivo   INT NOT NULL REFERENCES archivo(id_archivo) ON DELETE CASCADE
);
