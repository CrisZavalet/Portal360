import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTime } from '../../core/services/work-time';

@Component({
  selector: 'app-fichaje',
  imports: [CommonModule],
  templateUrl: './fichaje.html',
  styleUrls: ['./fichaje.css'], // arreglé styleUrl → styleUrls
})
export class Fichaje implements OnInit, OnDestroy {

  currentDate: string = '';
  seconds: number = 0;
  isFichaje: boolean = false;
  tipoFichaje: 'Presencial' | 'Teletrabajo' = 'Presencial';
  intervalId!: any;
  mediaDiaria = 8;
  horasSemanales = 40;

  private startTime = 0; 
  private accumulatedTime = 0;

  horaFichaje: string | null = null; 
  constructor(private workTimeService: WorkTime) {}

  ngOnInit() {
    this.currentDate = new Date().toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  start() {
    if (this.isFichaje) return;

    this.isFichaje = true;
    this.startTime = Date.now() - this.accumulatedTime;

    const startDate = new Date();
    this.horaFichaje = startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('Hora_fichaje', JSON.stringify(this.horaFichaje));

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
        this.accumulatedTime = Date.now() - this.startTime;

    console.log(this.accumulatedTime)
    this.intervalId = null;


  const sessionSeconds = Math.floor((Date.now() - this.startTime) / 1000);
  // const todayKey = new Date().toISOString().split('T')[0]; 
  // const storedData = JSON.parse(localStorage.getItem('workData') || '{}');
  // if (!storedData[todayKey]) {
  //   storedData[todayKey] = 0;
  // }
  // storedData[todayKey] += sessionSeconds;
  // localStorage.setItem('workData', JSON.stringify(storedData));

  // console.log('Guardado:', storedData);
   console.log('Guardado:', sessionSeconds);

    this.workTimeService.addWorkSession(sessionSeconds);

    this.seconds = 0;
    this.accumulatedTime = 0;
    this.startTime = 0;
    this.isFichaje = false;
    
    this.horaFichaje = null;
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
    const remainingSeconds = Math.max((this.mediaDiaria * 3600) - this.seconds, 0);
    const hrs = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = remainingSeconds % 60;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }

  get horasRestantesSemanales(): string {
    const remainingSeconds = Math.max((this.horasSemanales * 3600) - this.seconds, 0);
    const hrs = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = remainingSeconds % 60;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }

  addOneHour() {
    this.seconds += 3600;
  }
}
