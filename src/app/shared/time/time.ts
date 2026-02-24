import { Component, computed, signal } from '@angular/core';
import { WorkTime } from '../../core/work-time';

@Component({
  selector: 'app-time',
  imports: [],
  templateUrl: './time.html',
  styleUrl: './time.css',
})
export class Time {
currentDate: any;
horasRestantes=0;
private startTime = 0;
private accumulatedTime = 0;
seconds: number = 0; 
 mediaDiaria = 8;
  horasSemanales = 40;
workData:any
todayKey:any
segundosHoy:any
segundosSemana:any
horasHoy:any
horasSemana:any
restantesHoy:any
restantesSemana:any
constructor(public workTimeService: WorkTime) {}
ngOnInit() {
 
  this.todayKey = new Date().toISOString().split('T')[0];

  this.segundosHoy = computed(() =>
    this.workTimeService.workData()[this.todayKey] || 0
  );
  this.segundosSemana = computed(() => {
    const today = new Date();
    const firstDay = new Date(today);

    const day = firstDay.getDay();
    const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1);
    firstDay.setDate(diff);
    let total = 0;
    Object.keys(this.workTimeService.workData()).forEach(date => {
      const current = new Date(date);
      if (current >= firstDay && current <= today) {
        total += this.workTimeService.workData()[date];
      }
    });

    return total;
  });

  this.horasHoy = computed(() => this.format(this.segundosHoy()));
  this.horasSemana = computed(() => this.format(this.segundosSemana()));
  this.restantesHoy = computed(() =>
    this.format(Math.max((this.mediaDiaria * 3600) - this.segundosHoy(), 0))
  );
  console.log(this.restantesHoy());

  this.restantesSemana = computed(() =>
    this.format(Math.max((this.horasSemanales * 3600) - this.segundosSemana(), 0))
  );

 

}
 private format(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}