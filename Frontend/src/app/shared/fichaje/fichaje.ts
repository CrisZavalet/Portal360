import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTime } from '../../core/services/work-time';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-fichaje',
  imports: [CommonModule],
  templateUrl: './fichaje.html',
  styleUrls: ['./fichaje.css'],
})
export class Fichaje implements OnInit, OnDestroy {

  currentDate = '';
  seconds = 0;

  isFichaje = false;

  tipoFichaje: 'Presencial' | 'Teletrabajo' = 'Presencial';

  private intervalId: ReturnType<typeof setInterval> | null = null;

  mediaDiaria = 8;
  horasSemanales = 40;

  idEmployee: number | null = null;

  private startTime = 0;

  horaFichaje: string | null = null;

  constructor(
    private workTimeService: WorkTime,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const start = localStorage.getItem('startTime');

    if (start) {

      this.startTime = Number(start);

      if (this.startTime > 0) {
        this.isFichaje = true;
        this.iniciarIntervalo();
      }
    }
  }


  ngOnDestroy(): void {
    this.detenerIntervalo();
  }


  start(): void {

    if (this.isFichaje) {
      return;
    }

    const id = localStorage.getItem('idEmployee');

    if (!id) {
      console.error('No se encontró idEmployee');
      return;
    }

    this.idEmployee = Number(id);

    this.authService.fichaje(this.idEmployee).subscribe({

      next: () => {

        this.isFichaje = true;

        this.startTime = Date.now();

        localStorage.setItem(
          'startTime',
          this.startTime.toString()
        );

        this.iniciarIntervalo();

      },

      error: (err) => {
        console.error('Error al iniciar fichaje:', err);
      }

    });
  }


  stop(): void {

    if (!this.isFichaje) {
      return;
    }

    const id = localStorage.getItem('idEmployee');

    if (!id) {
      console.error('No se encontró idEmployee');
      return;
    }

    this.idEmployee = Number(id);

    this.authService.fichaje(this.idEmployee).subscribe({

      next: (response) => {

        console.log('Fichaje de salida correcto:', response);

        this.detenerCronometro();

      },

      error: (err) => {
        console.error('Error al finalizar fichaje:', err);
      }

    });
  }


  private iniciarIntervalo(): void {

    // MUY IMPORTANTE:
    // evitar crear varios intervalos
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {

      if (!this.isFichaje || this.startTime <= 0) {
        return;
      }

      this.seconds = Math.floor(
        (Date.now() - this.startTime) / 1000
      );

      this.workTimeService.updateCurrentSession(
        this.seconds
      );

    }, 1000);
  }


  private detenerIntervalo(): void {

    if (this.intervalId !== null) {

      clearInterval(this.intervalId);

      this.intervalId = null;
    }
  }


  private detenerCronometro(): void {

    this.detenerIntervalo();

    // Guardamos la sesión
    this.workTimeService.addWorkSession(this.seconds);

    this.seconds = 0;
    this.startTime = 0;
    this.isFichaje = false;
    this.horaFichaje = null;

    this.workTimeService.updateCurrentSession(0);

    localStorage.removeItem('startTime');
  }


  get formattedTime(): string {

    const hrs = Math.floor(this.seconds / 3600);

    const mins = Math.floor(
      (this.seconds % 3600) / 60
    );

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

    return this.formatTime(remainingSeconds);
  }


  get horasRestantesSemanales(): string {

    const remainingSeconds = Math.max(
      (this.horasSemanales * 3600) - this.seconds,
      0
    );

    return this.formatTime(remainingSeconds);
  }


  private formatTime(seconds: number): string {

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor(
      (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }


  addOneHour(): void {
    this.seconds += 3600;
  }
}