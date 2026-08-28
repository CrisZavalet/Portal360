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

    this.weekDays.forEach(day => {
      day.events = [];
    });

    if (!this.solicitudes || this.solicitudes.length === 0) {
      return;
    }

    this.solicitudes.forEach(solicitud => {

      const inicio = this.fechaSinHora(solicitud.startDate);

      const fin = solicitud.endDate
        ? this.fechaSinHora(solicitud.endDate)
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

  getTipoEvento(idType: number): 'vacaciones' | 'baja' | 'ausencia' {

    switch (idType) {

      case 8:
        return 'vacaciones';

      case 4:
      case 5:
      case 6:
        return 'baja';

      default:
        return 'ausencia';

    }

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