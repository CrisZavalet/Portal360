<div align="center">
  <img src="assets/portal_m.png" width="100" alt="Portal360 logo"/>
</div>

<div align="center">

# PORTAL360

### Matriz de Roles y Permisos

</div>

---

## Roles del sistema

| Rol          | Descripcion                                   | Alcance de acceso                                                                              |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Empleado** | Trabajador estandar de la empresa             | Solo puede ver, crear y descargar su propia informacion                                        |
| **RRHH**     | Responsable de recursos humanos y personal    | Gestiona todos los empleados. No puede modificar la configuracion del sistema ni asignar roles |
| **Admin**    | Administrador tecnico y funcional del sistema | Acceso total. El unico que puede cambiar roles, eliminar datos y configurar el sistema         |

---

## Leyenda

| Valor     | Significado                                                     |
| --------- | --------------------------------------------------------------- |
| `SI`      | Acceso completo a esta accion                                   |
| `PARCIAL` | Acceso limitado — se especifica exactamente a que si y a que no |
| `NO`      | Sin acceso — accion denegada                                    |

---

## VER — Lectura de informacion

| Accion                            | Descripcion                                                 | Empleado | RRHH | Admin |
| --------------------------------- | ----------------------------------------------------------- | :------: | :--: | :---: |
| Ver perfil propio                 | Consultar nombre, apellidos, DNI, telefono y correo propios |    SI    |  SI  |  SI   |
| Ver perfil de otros empleados     | Consultar datos personales de cualquier empleado            |    NO    |  SI  |  SI   |
| Ver contrato propio               | Consultar tipo de contrato, fechas de inicio y fin          |    SI    |  SI  |  SI   |
| Ver contrato de otros             | Consultar condiciones contractuales de cualquier empleado   |    NO    |  SI  |  SI   |
| Ver fichajes propios              | Consultar el historial de entradas y salidas de su jornada  |    SI    |  SI  |  SI   |
| Ver fichajes de otros empleados   | Consultar el historial de jornada de cualquier empleado     |    NO    |  SI  |  SI   |
| Ver ausencias propias             | Consultar vacaciones, bajas y permisos solicitados          |    SI    |  SI  |  SI   |
| Ver ausencias de otros empleados  | Consultar ausencias de cualquier empleado                   |    NO    |  SI  |  SI   |
| Ver nominas propias               | Consultar el listado de nominas del empleado                |    SI    |  SI  |  SI   |
| Ver nominas de otros empleados    | Consultar nominas de cualquier empleado                     |    NO    |  SI  |  SI   |
| Ver documentos propios            | Consultar contratos, certificados y documentos personales   |    SI    |  SI  |  SI   |
| Ver documentos de otros empleados | Consultar documentos de cualquier empleado                  |    NO    |  SI  |  SI   |
| Ver solicitudes propias           | Consultar el estado de las solicitudes enviadas             |    SI    |  SI  |  SI   |
| Ver solicitudes de todos          | Consultar solicitudes pendientes de cualquier empleado      |    NO    |  SI  |  SI   |
| Ver calendario del equipo         | Ver quien esta de vacaciones o baja cada semana             | PARCIAL  |  SI  |  SI   |
| Ver log de auditoria              | Historial completo de todas las acciones del sistema        |    NO    |  NO  |  SI   |

> **PARCIAL — Ver calendario del equipo:** El empleado solo ve su propio estado en el calendario, no las ausencias de otros.

---

## CREAR — Alta de nuevos registros

| Accion                                | Descripcion                                                    | Empleado | RRHH | Admin |
| ------------------------------------- | -------------------------------------------------------------- | :------: | :--: | :---: |
| Registrar fichaje de entrada          | Marcar el inicio de su jornada laboral                         |    SI    |  SI  |  SI   |
| Registrar fichaje de salida           | Marcar el fin de su jornada laboral                            |    SI    |  SI  |  SI   |
| Fichar por otro empleado              | Registrar entrada o salida en nombre de otro empleado          |    NO    |  SI  |  SI   |
| Crear solicitud de vacaciones         | Enviar una peticion de dias de vacaciones para aprobacion      |    SI    |  SI  |  SI   |
| Crear solicitud de baja medica        | Registrar una baja por enfermedad o accidente                  | PARCIAL  |  SI  |  SI   |
| Crear solicitud de permiso            | Solicitar un permiso puntual (asuntos propios, cita medica...) |    SI    |  SI  |  SI   |
| Subir documento propio                | Adjuntar un documento personal (justificante, certificado...)  | PARCIAL  |  SI  |  SI   |
| Subir documento de cualquier empleado | Adjuntar nominas, contratos u otros docs a cualquier ficha     |    NO    |  SI  |  SI   |
| Crear nuevo empleado                  | Dar de alta a un nuevo trabajador en el sistema                |    NO    |  SI  |  SI   |
| Crear tipo de solicitud               | Definir nuevas categorias de solicitud                         |    NO    |  NO  |  SI   |
| Crear nuevo rol                       | Definir un nuevo perfil de acceso en el sistema                |    NO    |  NO  |  SI   |

> **PARCIAL — Crear solicitud de baja medica:** El empleado solo puede registrar su propia baja, no la de otro.
>
> **PARCIAL — Subir documento propio:** Solo puede subir documentos a su propia ficha, no a la de otros empleados.

---

## DESCARGAR — Exportacion de archivos

| Accion                                  | Descripcion                                                  | Empleado | RRHH | Admin |
| --------------------------------------- | ------------------------------------------------------------ | :------: | :--: | :---: |
| Descargar nomina propia                 | Exportar cualquiera de sus nominas en PDF                    |    SI    |  SI  |  SI   |
| Descargar nomina de otro empleado       | Exportar la nomina de cualquier empleado en PDF              |    NO    |  SI  |  SI   |
| Descargar contrato propio               | Exportar su contrato laboral en PDF                          |    SI    |  SI  |  SI   |
| Descargar contrato de otro empleado     | Exportar el contrato laboral de cualquier empleado           |    NO    |  SI  |  SI   |
| Descargar informe de fichajes propio    | Exportar el registro horario oficial propio en PDF           |    SI    |  SI  |  SI   |
| Descargar informe de fichajes de todos  | Exportar el registro horario de cualquier empleado o periodo |    NO    |  SI  |  SI   |
| Descargar informe de ausencias propio   | Exportar resumen de sus ausencias y dias disponibles en PDF  |    SI    |  SI  |  SI   |
| Descargar informe de ausencias de todos | Exportar resumen de ausencias de cualquier empleado          |    NO    |  SI  |  SI   |
| Descargar documentos propios            | Exportar cualquier documento de su ficha personal            |    SI    |  SI  |  SI   |
| Descargar documentos de otros empleados | Exportar documentos de la ficha de cualquier empleado        |    NO    |  SI  |  SI   |

---

## ADMINISTRAR — Gestion y configuracion

| Accion                                   | Descripcion                                                     | Empleado | RRHH | Admin |
| ---------------------------------------- | --------------------------------------------------------------- | :------: | :--: | :---: |
| Editar datos basicos propios             | Modificar telefono, correo e IBAN personal                      |    SI    |  SI  |  SI   |
| Editar datos personales de otro empleado | Modificar nombre, DNI, telefono o correo de cualquier empleado  |    NO    |  SI  |  SI   |
| Editar datos contractuales               | Modificar tipo de contrato, salario, fechas y puesto            |    NO    |  SI  |  SI   |
| Aprobar solicitud de vacaciones          | Confirmar o rechazar una peticion de vacaciones pendiente       |    NO    |  SI  |  SI   |
| Aprobar solicitud de baja                | Confirmar o rechazar una baja medica pendiente                  |    NO    |  SI  |  SI   |
| Aprobar correccion de fichaje            | Validar una solicitud de correccion de hora de entrada o salida |    NO    |  SI  |  SI   |
| Eliminar documento                       | Borrar permanentemente un documento del sistema                 |    NO    |  NO  |  SI   |
| Asignar rol a empleado                   | Cambiar el perfil de acceso de un usuario                       |    NO    |  NO  |  SI   |
| Desactivar empleado                      | Desactivar la cuenta de acceso de un trabajador                 |    NO    |  SI  |  SI   |
| Gestionar departamentos y puestos        | Crear, editar o eliminar departamentos y puestos de trabajo     |    NO    |  SI  |  SI   |
| Configurar parametros del sistema        | Ajustes globales: dias de vacaciones por convenio, horarios...  |    NO    |  NO  |  SI   |
| Ver log de auditoria                     | Consultar el historial completo de acciones del sistema         |    NO    |  NO  |  SI   |

---

<div align="center">

_Portal360_

</div>
