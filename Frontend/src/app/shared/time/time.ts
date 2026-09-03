import { Component, computed } from '@angular/core';
import { WorkTime } from '../../core/services/work-time';

@Component({
  selector: 'app-time',
  imports: [],
  templateUrl: './time.html',
  styleUrl: './time.css',
})
export class Time {

  mediaDiaria = 8;
  horasSemanales = 40;

  constructor(public workTimeService: WorkTime) {}

  segundosHoy = computed(() => {

    const todayKey = this.getTodayKey();

    const trabajadoHoy =
      this.workTimeService.workData()[todayKey] || 0;

    const sesionActual =
      this.workTimeService.currentSession();

    return trabajadoHoy + sesionActual;
  });


  segundosSemana = computed(() => {

    const today = new Date();

    const day = today.getDay();

    const diff =
      today.getDate() - day + (day === 0 ? -6 : 1);

    const firstDay = new Date(today);

    firstDay.setDate(diff);

    firstDay.setHours(0, 0, 0, 0);

    let total = 0;

    const data = this.workTimeService.workData();

    Object.entries(data).forEach(([date, seconds]) => {

      const current = new Date(date + 'T00:00:00');

      if (current >= firstDay && current <= today) {
        total += seconds;
      }

    });

    return total + this.workTimeService.currentSession();
  });


  horasHoy = computed(() =>
    this.format(this.segundosHoy())
  );


  horasSemana = computed(() =>
    this.format(this.segundosSemana())
  );


  restantesHoy = computed(() =>
    this.format(
      Math.max(
        (this.mediaDiaria * 3600) -
        this.segundosHoy(),
        0
      )
    )
  );


  restantesSemana = computed(() =>
    this.format(
      Math.max(
        (this.horasSemanales * 3600) -
        this.segundosSemana(),
        0
      )
    )
  );


  private getTodayKey(): string {

    return new Date()
      .toISOString()
      .split('T')[0];

  }


  private format(seconds: number): string {

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor(
      (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }


  private pad(value: number): string {

    return value
      .toString()
      .padStart(2, '0');

  }
}