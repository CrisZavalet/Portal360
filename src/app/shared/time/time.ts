import { Component } from '@angular/core';

@Component({
  selector: 'app-time',
  imports: [],
  templateUrl: './time.html',
  styleUrl: './time.css',
})
export class Time {
mediaDiaria = 8;
horasSemanales = 40
currentDate: any;
horasRestantes=0;
private startTime = 0;
private accumulatedTime = 0;
seconds: number = 0; 


ngOnInit() {
  this.currentDate =new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

}
get formattedTime(): string {
    const hrs = Math.floor(this.seconds / 3600);
    const mins = Math.floor((this.seconds % 3600) / 60);
    const secs = this.seconds % 60;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

get horasTrabajadas(): number {
  return this.seconds / 3600;
}

get horasRestantesDiarias(): string {
  const remainingSeconds = Math.max(
    (this.mediaDiaria * 3600) - this.seconds,
    0
  );

  const hrs = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
}

get horasRestantesSemanales(): string {
  const remainingSeconds = Math.max(
    (this.horasSemanales * 3600) - this.seconds,
    0
  );

  const hrs = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
}

addOneHour() {
  this.seconds += 3600;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  


}
