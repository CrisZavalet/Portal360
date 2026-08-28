import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ausencia-empleado',
  imports: [FormsModule],
  templateUrl: './ausencia-empleado.html',
  styleUrl: './ausencia-empleado.css',
})
export class AusenciaEmpleado {
id: any;
empleadoSelectado: any;
solicitud: any[] = [];
filtroEstado: number | null = null;
solicitudesFiltradas: any[] = [];
aniosDisponibles: number[] = [];
anioSeleccionado: number | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}
    ngOnInit() {

      this.id = this.route.snapshot.params['id'];
      this.datosEmpleado(this.id);
      this.solicitudesAusencias(this.id);
    }

    datosEmpleado(id: any) {
      this.authService.getEmployeeById(id).subscribe({
        next: (data) => {
          this.empleadoSelectado = data;

          console.log('Datos del empleado:', this.empleadoSelectado);
        }
,        error: (err) => {
          console.error('STATUS:', err.status);
          console.error('ERROR BACKEND:', err.error);
        },
      });
    }

solicitudesAusencias(id: any) {
  this.authService.getSolicitudById(id).subscribe({
    next: (data) => {

      this.solicitud = Array.isArray(data) ? data : [data];

      console.log('Solicitudes de ausencias:', this.solicitud);

      // Sacamos los años disponibles
      this.aniosDisponibles = [
        ...new Set(
          this.solicitud
            .filter((s: any) => s.startDate)
            .map((s: any) => new Date(s.startDate).getFullYear())
        )
      ].sort((a, b) => b - a);

      // Inicialmente mostramos todas
      this.solicitudesFiltradas = [...this.solicitud];

    },
    error: (err) => {
      console.error('STATUS:', err.status);
      console.error('ERROR BACKEND:', err.error);
    },
  });
}

    volver() {
      window.history.back();
    }

 getEstadoTexto(idState: number): string {
    switch (idState) {
      case 1:
        return 'Pendiente';

      case 2:
        return 'Aceptada';

      case 3:
        return 'Rechazada';

      default:
        return 'Desconocido';
    }
  }

  getEstadoClase(idState: number): string {
    switch (idState) {
      case 1:
        return 'bg-yellow-100 text-yellow-700';

      case 2:
        return 'bg-green-100 text-green-700';

      case 3:
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  getDuracion(solicitud: any): string {

    if (solicitud.startTime && solicitud.endTime) {
      return `${solicitud.startTime.substring(0, 5)} - ${solicitud.endTime.substring(0, 5)}`;
    }

    if (
      solicitud.startDate &&
      solicitud.endDate &&
      solicitud.startDate !== solicitud.endDate
    ) {
      return `${this.formatearFecha(solicitud.startDate)} - ${this.formatearFecha(solicitud.endDate)}`;
    }

    return '1 día';
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';

    const date = new Date(fecha + 'T00:00:00');

    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getTipoAusencia(solicitud: any): string {
    return solicitud.title || 'Ausencia';
  }

  filtrarEstado(idState: number | null) {

  this.filtroEstado = idState;

    this.aplicarFiltros();

}
aplicarFiltros() {

  this.solicitudesFiltradas = this.solicitud.filter((solicitud: any) => {

    // FILTRO POR AÑO
    const coincideAnio =
      this.anioSeleccionado === null ||
      new Date(solicitud.startDate).getFullYear() === this.anioSeleccionado;

    // FILTRO POR ESTADO
    const coincideEstado =
      this.filtroEstado === null ||
      solicitud.idState === this.filtroEstado;

    return coincideAnio && coincideEstado;
  });
}


getTotalAnio(): number {

  return this.solicitud.filter((s: any) => {

    return this.anioSeleccionado === null ||
      new Date(s.startDate).getFullYear() === this.anioSeleccionado;

  }).length;

}
getAceptadasAnio(): number {

  return this.solicitud.filter((s: any) => {

    const mismoAnio =
      this.anioSeleccionado === null ||
      new Date(s.startDate).getFullYear() === this.anioSeleccionado;

    return mismoAnio && s.idState === 2;

  }).length;

}

getPendientesAnio(): number {

  return this.solicitud.filter((s: any) => {

    const mismoAnio =
      this.anioSeleccionado === null ||
      new Date(s.startDate).getFullYear() === this.anioSeleccionado;

    return mismoAnio && s.idState === 1;

  }).length;

}

getRechazadasAnio(): number {

  return this.solicitud.filter((s: any) => {

    const mismoAnio =
      this.anioSeleccionado === null ||
      new Date(s.startDate).getFullYear() === this.anioSeleccionado;

    return mismoAnio && s.idState === 3;

  }).length;

}
}
