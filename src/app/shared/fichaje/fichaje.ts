import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fichaje',
  imports: [CommonModule],
  templateUrl: './fichaje.html',
  styleUrl: './fichaje.css',
})
export class Fichaje {
currentDate: any;
timer!: any;
seconds: number = 0; 
isFichaje: boolean = false;
tipoFichaje: 'Presencial' | 'Teletrabajo' = 'Presencial';
intervalId!: any;
mediaDiaria=8;
horasSemanales=40;

private startTime = 0;
private accumulatedTime = 0;

ngOnInit() {
  this.currentDate =new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  
}

// test() {
//   console.log('CLICK FUNCIONA');
// }

start() {
  if (this.isFichaje) return;
  this.isFichaje = true;
  this.startTime = Date.now()- this.accumulatedTime;
  this.intervalId = setInterval(() => {
    this.seconds = Math.floor((Date.now() - this.startTime) / 1000);
  }, 1000);
}

 pause() {
     if (!this.isFichaje) return;

  clearInterval(this.intervalId);
  this.intervalId = null;

  this.accumulatedTime = Date.now() - this.startTime;

  this.isFichaje = false;
  }

  stop() {
     clearInterval(this.intervalId);
  this.intervalId = null;

  this.seconds = 0;
  this.accumulatedTime = 0;
  this.startTime = 0;
  this.isFichaje = false;
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

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  
}