import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudAusencias } from '../../core/interfaces/solicitudAusencias.interface';
import { AuthService } from '../../core/services/auth-service';
import { ObtenerAusencias } from '../../core/interfaces/obtenerAusencias.interface';
@Component({
  selector: 'app-peticiones',
  imports: [CommonModule],
  templateUrl: './peticiones.html',
  styleUrl: './peticiones.css',
})
export class Peticiones {
 solicitudes: ObtenerAusencias[] = [];
  cargando = false;
  error = '';
  filtroActual: 'PENDIENTES' | 'APROBADAS' | 'RECHAZADAS' = 'PENDIENTES';
AbsenceType = [
  { id: 1, name: 'Hora Libre Disposición' },
  { id: 2, name: 'Cita Médica' },
  { id: 3, name: 'Baja Boda' },
  { id: 4, name: 'Baja Larga' },
  { id: 5, name: 'Baja Paternidad' },
  { id: 6, name: 'Incapacidad Temporal' },
  { id: 7, name: 'Permiso de operación' },
  { id: 8, name: 'Vacaciones' },
  { id: 9, name: 'Otros' }
];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }


  cargarSolicitudes(): void {

    this.cargando = true;
    this.error = '';

    this.authService.getSolicitudes()
      .subscribe({

        next: (data) => {

          console.log('Solicitudes recibidas:', data);

          this.solicitudes = data;

          this.cargando = false;
        },

        error: (error) => {

          console.error(
            'Error al obtener las solicitudes:',
            error
          );

          this.error = 'No se han podido cargar las solicitudes.';

          this.cargando = false;
        }

      });
  }

tipoAusencias(idType: number): string {

  const tipo = this.AbsenceType.find(
    tipo => tipo.id === idType
  );

  return tipo ? tipo.name : 'Tipo desconocido';
}

  cambiarFiltro(
    filtro: 'PENDIENTES' | 'APROBADAS' | 'RECHAZADAS'
  ): void {

    this.filtroActual = filtro;

  }

  get solicitudesFiltradas(): ObtenerAusencias[] {

  switch (this.filtroActual) {

    case 'PENDIENTES':
      return this.solicitudes.filter(
        solicitud => solicitud.idState === 1
      );

    case 'APROBADAS':
      return this.solicitudes.filter(
        solicitud => solicitud.idState === 2
      );

    case 'RECHAZADAS':
      return this.solicitudes.filter(
        solicitud => solicitud.idState === 3
      );

    default:
      return [];
  }
}

  getDuracion(solicitud: ObtenerAusencias): string {

  
    if (solicitud.startTime && solicitud.endTime) {
    return `${solicitud.startTime.substring(0, 5)} - ${solicitud.endTime.substring(0, 5)}`;
  }

  if (solicitud.startDate === solicitud.endDate) {
    return `1 día`;
  }


  if (solicitud.startDate != solicitud.endDate) {
    return `Varios días (${this.calcularDias(solicitud.startDate, solicitud.endDate || '')} días)`;
  }

  if (solicitud.startDate && !solicitud.endDate) {
    return '1 día';
  }



        return '';

    }

  


  private calcularDias(
    inicio: string,
    fin: string
  ): number {

    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    const diferencia =
      fechaFin.getTime() - fechaInicio.getTime();

    return Math.floor(
      diferencia / (1000 * 60 * 60 * 24)
    ) + 1;

  }


  formatearFecha(fecha: string | null): string {

    if (!fecha) {
      return '-';
    }

    return new Date(fecha).toLocaleDateString('es-ES');

  }

  aceptarSolicitud(solicitud: ObtenerAusencias): void {

  this.authService
    .updateSolicitudStatus(solicitud.idRequest, 2)
    .subscribe({
      next: (respuesta) => {

        console.log('Solicitud aprobada:', respuesta);

        solicitud.idState = 2;

      },

      error: (error) => {

        console.error(
          'Error al aprobar la solicitud:',
          error
        );

      }
    });
}

rechazarSolicitud(solicitud: ObtenerAusencias): void {

  this.authService
    .updateSolicitudStatus(solicitud.idRequest, 3)
    .subscribe({
      next: (respuesta) => {

        console.log('Solicitud rechazada:', respuesta);

        solicitud.idState = 3;

      },

      error: (error) => {

        console.error(
          'Error al rechazar la solicitud:',
          error
        );

      }
    });
}


}
