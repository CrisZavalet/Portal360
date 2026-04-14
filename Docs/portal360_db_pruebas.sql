-- =============================================================================
-- BASE DE DATOS: Portal360
-- Sugerencia de nombre: portal360_2 (para evitar duplicados)
-- PostgreSQL 18.3
-- =============================================================================
-- LIMPIEZA: Eliminar tablas si existen (en orden inverso a las dependencias)
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
-- =============================================================================
-- CREACIÓN DE TABLAS (DDL)
-- =============================================================================
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE,
    activo BOOLEAN DEFAULT TRUE
);
CREATE TABLE usuario_rol (
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_rol INT NOT NULL REFERENCES rol(id_rol) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_rol)
);
CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE REFERENCES usuario(id_usuario) ON DELETE
    SET NULL,
        dni VARCHAR(20) NOT NULL UNIQUE,
        nombre VARCHAR(100),
        apellidos VARCHAR(150),
        fecha_nacimiento DATE,
        telefono VARCHAR(20),
        activo BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE puesto (
    id_puesto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    activo BOOLEAN DEFAULT TRUE
);
CREATE TABLE empleado_puesto (
    id_empleado_puesto SERIAL PRIMARY KEY,
    id_empleado INT NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    id_puesto INT NOT NULL REFERENCES puesto(id_puesto) ON DELETE CASCADE,
    fecha_inicio DATE,
    fecha_fin DATE
);
CREATE TABLE fichaje (
    id_fichaje SERIAL PRIMARY KEY,
    id_empleado INT NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    tipo VARCHAR(10) CHECK (tipo IN ('ENTRADA', 'SALIDA')),
    fecha_hora TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE tipo_documento (
    id_tipo INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE archivo (
    id_archivo SERIAL PRIMARY KEY,
    storage_key VARCHAR(255) UNIQUE,
    nombre_archivo VARCHAR(255),
    mime_type VARCHAR(100),
    tamano_bytes BIGINT,
    creado_por INT REFERENCES usuario(id_usuario) ON DELETE
    SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE documento (
    id_documento INT PRIMARY KEY,
    id_empleado INT NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    id_tipo INT NOT NULL REFERENCES tipo_documento(id_tipo),
    id_archivo INT NOT NULL REFERENCES archivo(id_archivo),
    titulo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE tipo_solicitud (
    id_tipo INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE estado_solicitud (
    id_estado INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);
-- Tabla Solicitud
CREATE TABLE solicitud (
    id_solicitud SERIAL PRIMARY KEY,
    id_empleado INT NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    id_tipo INT NOT NULL REFERENCES tipo_solicitud(id_tipo),
    id_estado INT NOT NULL REFERENCES estado_solicitud(id_estado),
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    hora_inicio TIME,
    hora_fin TIME,
    fecha_resolucion TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Validación: fecha inicio <= fecha fin, y si hay horas, fin > inicio
    CONSTRAINT check_fechas_horas CHECK (
        (fecha_fin >= fecha_inicio)
        AND (
            hora_inicio IS NULL
            OR hora_fin IS NULL
            OR hora_fin > hora_inicio
        )
    )
);
CREATE TABLE solicitud_historial (
    id_historial SERIAL PRIMARY KEY,
    id_solicitud INT NOT NULL REFERENCES solicitud(id_solicitud) ON DELETE CASCADE,
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_estado INT NOT NULL REFERENCES estado_solicitud(id_estado),
    accion VARCHAR(20) CHECK (accion IN ('CREADA', 'APROBADA', 'RECHAZADA')),
    comentario TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE solicitud_adjunto (
    id_adjunto SERIAL PRIMARY KEY,
    id_solicitud INT NOT NULL REFERENCES solicitud(id_solicitud) ON DELETE CASCADE,
    id_archivo INT NOT NULL REFERENCES archivo(id_archivo) ON DELETE CASCADE
);
-- =============================================================================
-- INSERCIÓN DE DATOS DE PRUEBA (DML)
-- =============================================================================
-- Usuarios
INSERT INTO usuario (email, password_hash)
VALUES (
        'admin@portal360.com',
        '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'
    ),
    (
        'lucia.hr@portal360.com',
        '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'
    ),
    (
        'marcos.dev@portal360.com',
        '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'
    ),
    (
        'elena.pm@portal360.com',
        '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'
    );
-- Roles
INSERT INTO rol (nombre_rol)
VALUES ('ADMIN'),
    ('RRHH'),
    ('EMPLEADO');
-- Asignar Roles
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1),
    (2, 2),
    (3, 3),
    (4, 3);
-- Empleados
INSERT INTO empleado (
        id_usuario,
        dni,
        nombre,
        apellidos,
        fecha_nacimiento,
        telefono
    )
VALUES (
        2,
        '22222222B',
        'Lucía',
        'Sanz Castro',
        '1990-01-10',
        '611000001'
    ),
    (
        3,
        '33333333C',
        'Marcos',
        'López Ruiz',
        '1985-11-25',
        '611000002'
    ),
    (
        4,
        '44444444D',
        'Elena',
        'Belmonte Gil',
        '1993-07-14',
        '611000003'
    );
-- Puestos
INSERT INTO puesto (nombre)
VALUES ('Developer'),
    ('Manager'),
    ('HR Specialist');
-- Empleado_Puesto
INSERT INTO empleado_puesto (id_empleado, id_puesto, fecha_inicio)
VALUES (1, 3, '2024-01-01'),
    (2, 1, '2024-02-15'),
    (3, 2, '2023-12-01');
-- Tipos y Estados
INSERT INTO tipo_documento (id_tipo, nombre)
VALUES (1, 'Contrato'),
    (2, 'Nómina');
INSERT INTO tipo_solicitud (id_tipo, nombre)
VALUES (1, 'Vacaciones'),
    (2, 'Horas Libres');
INSERT INTO estado_solicitud (id_estado, nombre)
VALUES (1, 'Pendiente'),
    (2, 'Aprobada');
-- Archivos
INSERT INTO archivo (
        storage_key,
        nombre_archivo,
        mime_type,
        tamano_bytes,
        creado_por
    )
VALUES (
        'key_vacaciones_marcos',
        'solicitud_vacaciones.pdf',
        'application/pdf',
        200000,
        3
    );
-- Solicitudes (Ejemplos con los nuevos campos)
INSERT INTO solicitud (
        id_empleado,
        id_tipo,
        id_estado,
        titulo,
        descripcion,
        fecha_inicio,
        fecha_fin,
        hora_inicio,
        hora_fin
    )
VALUES -- Caso 1: Vacaciones de varios días (sin horas)
    (
        2,
        1,
        1,
        'Vacaciones Agosto',
        'Primera quincena de agosto',
        '2026-08-01',
        '2026-08-15',
        NULL,
        NULL
    ),
    -- Caso 2: Horas libres en un solo día
    (
        3,
        2,
        1,
        'Asuntos Propios',
        'Salida para trámite bancario',
        '2026-05-10',
        '2026-05-10',
        '10:00:00',
        '12:30:00'
    );
-- Historial
INSERT INTO solicitud_historial (
        id_solicitud,
        id_usuario,
        id_estado,
        accion,
        comentario
    )
VALUES (
        1,
        2,
        1,
        'CREADA',
        'Registro inicial de vacaciones'
    ),
    (
        2,
        3,
        1,
        'CREADA',
        'Registro inicial de horas libres'
    );