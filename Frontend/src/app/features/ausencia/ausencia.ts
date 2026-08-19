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

@Component({
  selector: 'app-ausencia',
  imports: [FullCalendarModule, CommonModule, FormsModule],
  templateUrl: './ausencia.html',
  styleUrl: './ausencia.css',
})
export class Ausencia {

  constructor(private holidayService: Holiday, private authService: AuthService) {} 
  
exportModalOpen = false;
modalOpen = false;
idType: number = 1;

// Comentario
comments: string = '';

// Duración
durationType: 'hours' | 'day' | 'days' = 'hours';

// Fechas
startDate: string = '';
endDate: string = '';

// Horas
startTime: string = '';

endTime: string = '';
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
    this.generateCalendar();
    this.loadHolidays();

    this.events.push(
  {
    date: `${this.year}-07-10`,
    name: 'Vacaciones',
    type: 'vacation'
  },
  {
    date: `${this.year}-03-18`,
    name: 'Baja médica',
    type: 'sick'
  },
  {
    date: `${this.year}-04-22`,
    name: 'Ausencia',
    type: 'absence'
  }
);
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

changeYear(step:number){

  this.year += step;

  this.months = [];
  this.events = [];

  this.generateCalendar();
  this.loadHolidays();

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

getEvent(day:number | null, month:number){

  if(!day) return null;

  const date =
  `${this.year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  return this.events.find(e => e.date === date);

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


crearSolicitud(): void {

  let solicitud: SolicitudAusencias;

  if (this.durationType === 'hours') {

    solicitud = {
      idType: this.idType,
      comments: this.comments || null,
      durationType: 'HORAS',
      startDate: this.startDate,
      endDate: null,
      startTime: this.startTime + ':00',
      endTime: this.endTime + ':00'
    };

  } else if (this.durationType === 'day') {

    solicitud = {
      idType: this.idType,
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
}