import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Holiday } from '../../core/services/holiday';
import { CalendarEvent } from '../../core/interfaces/calendario.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { SolicitudAusencias } from '../../core/interfaces/solicitudAusencias.interface';
import { A11yModule } from "@angular/cdk/a11y";
import { ObtenerAusencias } from '../../core/interfaces/obtenerAusencias.interface';

@Component({
  selector: 'app-ausencia',
  imports: [FullCalendarModule, CommonModule, FormsModule, A11yModule],
  templateUrl: './ausencia.html',
  styleUrl: './ausencia.css',
})
export class Ausencia {

  constructor(private holidayService: Holiday, private authService: AuthService) {} 
  
exportModalOpen = false;
modalOpen = false;
idType: number = 1;
errorFormulario: string = '';
comments: string = '';
request: SolicitudAusencias[] = [];
durationType: 'hours' | 'day' | 'days' = 'hours';
today: string = new Date().toISOString().split('T')[0];
startDate: string = '';
endDate: string = '';
mostrarTodas = false;
startTime: string = '';
vacacionesGeneradas = 22;
vacacionesUtilizadas = 0;
vacacionesDisponibles = 22;
vacacionesPlanificadas = 0;
endTime: string = '';
todasLasSolicitudes: ObtenerAusencias[] = [];

selectAbsenceType = [
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

idEmployee: any;

holidays:any[] = [];
  year = new Date().getFullYear();

  months: (number | null)[][] = [];
events: CalendarEvent[] = [];
  selectedHoliday: {date:string,name:string} | null = null;

  monthNames = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  weekDays = ['L','M','X','J','V','S','D'];

 ngOnInit() {
    this.idEmployee = localStorage.getItem('idEmployee');
    this.obtenerListadoSolicitudes();
    this.generateCalendar();
    this.loadHolidays();

  }

setDuration(type: 'hours' | 'day' | 'days') {
  this.durationType = type;
}

  generateCalendar() {

    for (let month = 0; month < 12; month++) {

      const firstDay = new Date(this.year, month, 1).getDay();
      const daysInMonth = new Date(this.year, month + 1, 0).getDate();

      const monthDays: (number | null)[] = [];

      const startDay = firstDay === 0 ? 6 : firstDay - 1;

      for (let i = 0; i < startDay; i++) {
        monthDays.push(null);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        monthDays.push(day);
      }

      this.months.push(monthDays);
    }

  }

changeYear(step: number) {

  this.year += step;

  this.months = [];
  this.events = [];
  this.holidays = [];

  this.generateCalendar();

  this.loadHolidays();

  this.obtenerListadoSolicitudes();
}

  loadHolidays(){

    this.holidayService.getHolidays(this.year).subscribe((data:any)=>{

    this.holidays = data.map((h:any)=>({
      date: h.startDate,
      name: h.name?.[0]?.text || 'Festivo',
            type: 'holiday'

    }));

    this.holidays.push({
      date: `${this.year}-05-15`,
      name: 'San Isidro',
            type: 'holiday'

    });

     this.events = [...this.events, ...this.holidays];

  });
    

  }

isHoliday(day:number | null, month:number){

   if(!day) return false;

  const date =
  `${this.year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  return this.holidays.some(h => h.date === date);  

  }


  getHolidayName(day:number | null, month:number){

  if(!day) return '';

  const date =
  `${this.year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const holiday = this.holidays.find(h => h.date === date);

  return holiday ? holiday.name : '';

}

openHoliday(day:number | null, month:number){

  if(!day) return;

  const date =
  `${this.year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const holiday = this.holidays.find(h => h.date === date);

  if(holiday){
    this.selectedHoliday = holiday;

    const modal = document.getElementById('holiday_modal') as HTMLDialogElement;
    modal.showModal();
  }

}

getEvent(day: number | null, month: number) {

  if (!day) return null;

  const date =
    `${this.year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const solicitud = this.events.find(
    e => e.date === date && e.type !== 'holiday'
  );

  if (solicitud) {
    return solicitud;
  }

  return this.events.find(
    e => e.date === date && e.type === 'holiday'
  );
}

selectedEvent: CalendarEvent | null = null;

openEvent(day:number | null, month:number){

  const event = this.getEvent(day,month);

  if(!event) return;

  this.selectedEvent = event;

  const modal = document.getElementById('event_modal') as HTMLDialogElement;
  modal.showModal();

}

openExportModal() {
  this.exportModalOpen = true;  
}

closeExportModal() {
  this.exportModalOpen = false;  }

// hoy
isToday(day:number | null, month:number){

  if(!day) return false;

  const today = new Date();

  return (
    today.getFullYear() === this.year &&
    today.getMonth() === month &&
    today.getDate() === day
  );

}

openModal() {
  this.modalOpen = true;
}

closeModal() {
  this.modalOpen = false;
}

validarFormulario(): boolean {

  this.errorFormulario = '';

  if (!this.idType) {
    this.errorFormulario = 'Debes seleccionar un tipo de ausencia.';
    return false;
  }

  if (this.durationType === 'hours') {

    if (!this.startDate) {
      this.errorFormulario = 'Debes seleccionar una fecha.';
      return false;
    }

    if (!this.startTime || !this.endTime) {
      this.errorFormulario = 'Debes indicar la hora de inicio y la hora de fin.';
      return false;
    }

    if (this.startTime >= this.endTime) {
      this.errorFormulario =
        'La hora de fin debe ser posterior a la hora de inicio.';
      return false;
    }
  }

 
  if (this.durationType === 'day') {

    if (!this.startDate) {
      this.errorFormulario = 'Debes seleccionar una fecha.';
      return false;
    }

    if (this.startDate < this.today) {
      this.errorFormulario = 'La fecha no puede ser anterior a hoy.';
      return false;
    }

  }

  
  if (this.durationType === 'days') {

    if(this.startDate < this.today) {
      this.errorFormulario = 'La fecha de inicio no puede ser anterior a hoy.';
      return false;
    }

    if (!this.startDate || !this.endDate) {
      this.errorFormulario =
        'Debes indicar la fecha de inicio y la fecha de fin.';
      return false;
    }

    if (this.endDate < this.startDate) {
      this.errorFormulario =
        'La fecha de fin no puede ser anterior a la fecha de inicio.';
      return false;
    }
  }

  return true;
}

crearSolicitud(): void {
 if (!this.validarFormulario()) {
    return;
  }



  let solicitud: SolicitudAusencias;

  if (this.durationType === 'hours') {

    solicitud = {
      idType: this.idType,
      idEmployee: this.idEmployee,
      comments: this.comments || null,
      durationType: 'HORAS',
      startDate: this.startDate,
      endDate: null,
      startTime: this.startTime + ':00',
      endTime: this.endTime + ':00',
      

    };

  } else if (this.durationType === 'day') {

    solicitud = {
      idType: this.idType,
      idEmployee: this.idEmployee,
      comments: this.comments || null,
      durationType: 'UN_DIA',
      startDate: this.startDate,
      endDate: null,
      startTime: null,
      endTime: null
    };

  } else {

    solicitud = {
      idType: this.idType,
      idEmployee: this.idEmployee,
      comments: this.comments || null,
      durationType: 'VARIOS_DIAS',
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: null,
      endTime: null
    };

  }

  console.log('Solicitud a enviar:', solicitud);

  this.authService.createSolicitudAusencias(solicitud).subscribe({

    next: (respuesta) => {

      console.log('Solicitud creada correctamente:', respuesta);

      this.closeModal();

    },

    error: (error) => {

      console.error('Error al crear la solicitud:', error);

    }

  });
}

obtenerListadoSolicitudes(): void {

  this.authService.getSolicitudById(this.idEmployee).subscribe({

    next: (solicitudes) => {

      console.log('Todas las solicitudes:', solicitudes);

      // Guardamos todas las solicitudes
      this.todasLasSolicitudes = solicitudes;

      // Solo pendientes para la sección "Ausencias Pendientes"
      this.request = solicitudes
        .filter(solicitud => solicitud.idState === 1)
        .sort((a, b) => {
          return new Date(a.startDate).getTime() -
                 new Date(b.startDate).getTime();
        });

      // Calculamos las vacaciones
      this.calcularVacaciones();

      // Añadimos las solicitudes al calendario
      this.todasLasSolicitudes.forEach(solicitud => {

        // Solo queremos mostrar aprobadas
        if (solicitud.idState === 2) {
          this.agregarSolicitudAlCalendario(solicitud);
        }

      });

      console.log('Solicitudes pendientes:', this.request);
      console.log('Vacaciones:', {
        generadas: this.vacacionesGeneradas,
        utilizadas: this.vacacionesUtilizadas,
        disponibles: this.vacacionesDisponibles,
        planificadas: this.vacacionesPlanificadas
      });
    },

    error: (error) => {

      console.error(
        'Error al obtener el listado de solicitudes:',
        error
      );

      this.request = [];
      this.todasLasSolicitudes = [];

      this.calcularVacaciones();
    }

  });
}

calcularVacaciones(): void {

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Solo vacaciones aprobadas
  const vacaciones = this.todasLasSolicitudes.filter(
    solicitud =>
      solicitud.idType === 8 &&
      solicitud.idState === 2
  );

  let utilizadas = 0;
  let planificadas = 0;

  vacaciones.forEach(solicitud => {

    const inicio = this.crearFechaLocal(solicitud.startDate);

    // Solicitud de un solo día
    if (!solicitud.endDate) {

      if (inicio < hoy) {
        utilizadas += 1;
      } else {
        planificadas += 1;
      }

      return;
    }

    // Solicitud de varios días
    const fin = this.crearFechaLocal(solicitud.endDate);

    let fecha = new Date(inicio);

    while (fecha <= fin) {

  const dia = fecha.getDay();

  // Solo lunes a viernes
  if (dia !== 0 && dia !== 6) {

    if (fecha < hoy) {
      utilizadas++;
    } else {
      planificadas++;
    }
  }

  fecha.setDate(fecha.getDate() + 1);
}

  });

  this.vacacionesUtilizadas = utilizadas;
  this.vacacionesPlanificadas = planificadas;

  this.vacacionesDisponibles =
    this.vacacionesGeneradas -
    this.vacacionesUtilizadas -
    this.vacacionesPlanificadas;

  // Evitamos números negativos
  if (this.vacacionesDisponibles < 0) {
    this.vacacionesDisponibles = 0;
  }
}

crearFechaLocal(fecha: string): Date {

  const [year, month, day] = fecha.split('-').map(Number);

  return new Date(year, month - 1, day);
}

getTipoAusencia(idType: number): string {
  const tipo = this.selectAbsenceType.find(type => type.id === idType);
  return tipo ? tipo.name : 'Ausencia';
}

getDuracion(solicitud: SolicitudAusencias): string {


  if (solicitud.startTime && solicitud.endTime) {
    return `${solicitud.startTime.substring(0, 5)} - ${solicitud.endTime.substring(0, 5)}`;
  }

  if (solicitud.startDate && solicitud.endDate) {
    return `${this.formatearFecha(solicitud.startDate)} - ${this.formatearFecha(solicitud.endDate)}`;
  }

  if (solicitud.startDate && !solicitud.endDate) {
    return '1 día';
  }

  return '';
}

formatearFecha(fecha: string | null): string {

  if (!fecha) return '';

  const [year, month, day] = fecha.split('-');

  return `${day}/${month}/${year}`;
}

getSolicitudesVisibles(): SolicitudAusencias[] {

  if (this.mostrarTodas) {
    return this.request;
  }

  return this.request.slice(0, 2);
}

mostrarMas(): void {
  this.mostrarTodas = !this.mostrarTodas;
}

agregarSolicitudAlCalendario(solicitud: SolicitudAusencias): void {

  // Varios días
  if (solicitud.startDate && solicitud.endDate) {

    const inicio = this.crearFechaLocal(solicitud.startDate);
    const fin = this.crearFechaLocal(solicitud.endDate);

    const fechaActual = new Date(inicio);

    while (fechaActual <= fin) {

      const dia = fechaActual.getDay();

      // Solo lunes a viernes
      if (dia !== 0 && dia !== 6) {

        const fecha = this.formatearFechaCalendario(fechaActual);

        this.events.push({
          date: fecha,
          name: this.getTipoAusencia(solicitud.idType),
          type: this.getTipoEvento(solicitud.idType)
        });
      }

      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return;
  }

  // Un día o solicitud por horas
  if (solicitud.startDate) {

    this.events.push({
      date: solicitud.startDate,
      name: this.getTipoAusencia(solicitud.idType),
      type: this.getTipoEvento(solicitud.idType)
    });
  }
}

formatearFechaCalendario(fecha: Date): string {

  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

getTipoEvento(idType: number): 'vacation' | 'absence' | 'sick' {

  if (idType === 8) {
    return 'vacation';
  }

  if (idType === 6) {
    return 'sick';
  }

  return 'absence';
}

// validarDiaLaborable(): void {
//   if (!this.startDate) return;

//   const fecha = new Date(this.startDate + 'T00:00:00');
//   const dia = fecha.getDay();

//   // 0 = domingo
//   // 6 = sábado
//   if (dia === 0 || dia === 6) {
//     this.startDate = '';

//     alert('No puedes seleccionar sábados ni domingos.');
//   }
// }

validarFecha(tipo: 'start' | 'end'): void {

  const fecha = tipo === 'start'
    ? this.startDate
    : this.endDate;

  if (!fecha) return;

  const date = this.crearFechaLocal(fecha);
  const dia = date.getDay();

  // 0 = domingo
  // 6 = sábado
  if (dia === 0 || dia === 6) {

    if (tipo === 'start') {
      this.startDate = '';
    } else {
      this.endDate = '';
    }

    this.errorFormulario = 'No puedes seleccionar sábados ni domingos.';
    return;
  }

  // Comprobar que la fecha final no sea anterior
  if (
    this.startDate &&
    this.endDate &&
    this.endDate < this.startDate
  ) {

    this.endDate = '';

    this.errorFormulario =
      'La fecha de fin no puede ser anterior a la fecha de inicio.';

    return;
  }

  this.errorFormulario = '';
}
}