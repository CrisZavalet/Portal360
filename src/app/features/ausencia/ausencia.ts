import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-ausencia',
  imports: [FullCalendarModule],
  templateUrl: './ausencia.html',
  styleUrl: './ausencia.css',
})
export class Ausencia {

  year = new Date().getFullYear();

  months: (number | null)[][] = [];

  monthNames = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  weekDays = ['L','M','X','J','V','S','D'];

  events = [
    '2026-01-01',
    '2026-01-06',
    '2026-04-03',
    '2026-05-01'
  ];
 ngOnInit() {
    this.generateCalendar();
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

  isEvent(day: number | null, month:number){

    if(!day) return false;

    const date =
      `${this.year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    return this.events.includes(date);

  }

 changeYear(step:number){

  this.year += step;

  this.months = [];

  this.generateCalendar();

}

}
