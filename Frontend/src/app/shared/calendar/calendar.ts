import { Component } from '@angular/core';

interface CalendarEvent {
  label: string;
  type: 'vacaciones' | 'baja' | 'ausencia';
  user: string;
}

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {

    weekDays: { label: string; date: Date; isToday: boolean; events?: {label:string,type:'vacaciones'|'baja'|'ausencia'}[] }[] = [];
  currentUser = 'Florencia Macarena Sandoval';
  ngOnInit() {
    this.generateCurrentWeek();
        this.addMyEvents();

  }

  generateCurrentWeek() {
    const today = new Date();
    const currentDay = today.getDay(); 

    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    this.weekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      this.weekDays.push({
        label: dayLabels[i],
        date,
        isToday: date.toDateString() === today.toDateString()
      });
    }
  }

   addMyEvents() {
   
    const myUser = 'Florencia Macarena Sandoval'; 
    this.weekDays[0].events = [{label:'Baja medica', type:'baja'}]; 
  }


    loadUserEvents() {
    const allEvents: CalendarEvent[] = [
      { label: 'Vacaciones', type: 'vacaciones', user: 'flor' },
      { label: 'Baja médica', type: 'baja', user: 'flor' },
      { label: 'Ausencia', type: 'ausencia', user: 'flor' },
    ];

    for (let day of this.weekDays) {
      day.events = allEvents.filter(ev => ev.user === this.currentUser)
                            .filter(ev => true); 
    }
  }


}
