import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ObtenerAusencias } from '../../core/interfaces/obtenerAusencias.interface';

interface CalendarEvent {
  label: string;
  type: 'vacaciones' | 'baja' | 'ausencia';
}

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit, OnChanges {

  @Input() solicitudes: ObtenerAusencias[] = [];

  weekDays: {
    label: string;
    date: Date;
    isToday: boolean;
    events?: CalendarEvent[];
  }[] = [];

  ngOnInit() {
    this.generateCurrentWeek();
    this.cargarSolicitudesCalendario();
  }

  ngOnChanges() {

    if (!this.weekDays.length) {
      return;
    }

    this.cargarSolicitudesCalendario();
  }

  generateCurrentWeek() {

    const today = new Date();

    const currentDay = today.getDay();

    const mondayOffset = currentDay === 0
      ? -6
      : 1 - currentDay;

    const monday = new Date(today);

    monday.setDate(today.getDate() + mondayOffset);

    const dayLabels = [
      'Lun',
      'Mar',
      'Mié',
      'Jue',
      'Vie',
      'Sáb',
      'Dom'
    ];

    this.weekDays = [];

    for (let i = 0; i < 7; i++) {

      const date = new Date(monday);

      date.setDate(monday.getDate() + i);

      this.weekDays.push({
        label: dayLabels[i],
        date,
        isToday: date.toDateString() === today.toDateString(),
        events: []
      });

    }

  }

 cargarSolicitudesCalendario() {

  // Limpiar eventos anteriores
  this.weekDays.forEach(day => {
    day.events = [];
  });

  // Solo solicitudes aprobadas
  const solicitudesAprobadas = this.solicitudes.filter(
    solicitud => solicitud.idState === 2
  );

  if (solicitudesAprobadas.length === 0) {
    return;
  }

  solicitudesAprobadas.forEach(solicitud => {

    const inicio = solicitud.startDate.substring(0, 10);

    const fin = solicitud.endDate
      ? solicitud.endDate.substring(0, 10)
      : inicio;

    this.weekDays.forEach(day => {

      const fechaDia = this.fechaSinHoraDate(day.date);

      if (fechaDia >= inicio && fechaDia <= fin) {

        day.events?.push({
          label: solicitud.title,
          type: this.getTipoEvento(solicitud.idType)
        });

      }

    });

  });

}

 getTipoEvento(
  idType: number
): 'vacaciones' | 'baja' | 'ausencia' {

  if (idType === 8) {
    return 'vacaciones';
  }

  if (
    idType === 4 ||
    idType === 5 ||
    idType === 6
  ) {
    return 'baja';
  }

  if (
    idType === 1 ||
    idType === 2 ||
    idType === 3 ||
    idType === 7 ||
    idType === 9
  ) {
    return 'ausencia';
  }

  // Si llega un tipo desconocido,
  // no debería mostrarse como ausencia.
  return 'ausencia';
}

  fechaSinHora(fecha: string): string {

    return fecha.substring(0, 10);

  }

  fechaSinHoraDate(fecha: Date): string {

    const year = fecha.getFullYear();

    const month = String(fecha.getMonth() + 1).padStart(2, '0');

    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }

}