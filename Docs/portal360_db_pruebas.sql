-- =============================================
-- DATOS DE PRUEBA: Portal360
-- =============================================

-- 1. Usuarios (Contraseña: "123456" hasheada con bcrypt)
INSERT INTO usuario (email, password_hash)
VALUES ('admin@portal360.com', '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'),
    ('lucia.hr@portal360.com', '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'),
    ('marcos.dev@portal360.com', '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G'),
    ('elena.pm@portal360.com', '$2b$12$6y9mX3.V8p6YfG9.e7X7e.x7kX5E0y.G7v2Vw5A.u3.H2.y5.X6.G');

-- 2. Roles
INSERT INTO rol (nombre_rol)
VALUES ('ADMIN'),
    ('RRHH'),
    ('EMPLEADO');

-- 3. Asignar Roles
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1), -- Admin
    (2, 2), -- Lucía es RRHH
    (3, 3), -- Marcos es Empleado
    (4, 3); -- Elena es Empleado


-- 4. Empleados (ID_EMPLEADO generado: 1=Lucía, 2=Marcos, 3=Elena)
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

-- 5. Puestos
INSERT INTO puesto (nombre)
VALUES ('Developer'),
    ('Manager'),
    ('HR Specialist');

-- 6. Empleado_Puesto
INSERT INTO empleado_puesto (id_empleado, id_puesto, fecha_inicio)
VALUES (1, 3, '2024-01-01'),
    (2, 1, '2024-02-15'),
    (3, 2, '2023-12-01');

-- 7. Fichajes
INSERT INTO fichaje (id_empleado, tipo, fecha_hora)
VALUES (2, 'ENTRADA', '2026-04-13 08:00:00'),
    (2, 'SALIDA', '2026-04-13 17:00:00');

-- 8. Tipos Documento
INSERT INTO tipo_documento (id_tipo, nombre)
VALUES (1, 'Contrato'),
    (2, 'Nómina');

-- 9. Archivos
INSERT INTO archivo (
        storage_key,
        nombre_archivo,
        mime_type,
        tamano_bytes,
        creado_por
    )
VALUES (
        'key_c1',
        'contrato_lucia.pdf',
        'application/pdf',
        500000,
        1
    ),
    (
        'key_vacaciones_elena',
        'vacaciones_elena.pdf',
        'application/pdf',
        200000,
        4
    ),
    (
        'key_n1',
        'nomina_marcos.pdf',
        'application/pdf',
        300000,
        1
    );

-- 10. Documentos
INSERT INTO documento (
        id_documento,
        id_empleado,
        id_tipo,
        id_archivo,
        titulo
    )
VALUES (1, 1, 1, 1, 'Contrato Lucía'),
    (2, 2, 2, 2, 'Nómina Marzo Marcos');

-- 11. Tipos Solicitud
INSERT INTO tipo_solicitud (id_tipo, nombre)
VALUES (1, 'Vacaciones'),
    (2, 'Baja');

-- 12. Estados
INSERT INTO estado_solicitud (id_estado, nombre)
VALUES (1, 'Pendiente'),
    (2, 'Aprobada');

-- 13. Solicitudes
INSERT INTO solicitud (
        id_empleado,
        id_tipo,
        id_estado,
        titulo,
        descripcion
    )
VALUES (
        3,
        1,
        1,
        'Vacaciones Navidad',
        'Días del 24 al 31 de diciembre'
    );

-- 14. Historial
INSERT INTO solicitud_historial (
        id_solicitud,
        id_usuario,
        id_estado,
        accion,
        comentario
    )
VALUES (1, 4, 1, 'CREADA', 'Registro inicial');

-- 15. Adjuntos
INSERT INTO solicitud_adjunto (id_solicitud, id_archivo)
VALUES (1, 2);