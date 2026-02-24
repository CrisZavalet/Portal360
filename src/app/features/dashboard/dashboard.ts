import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Holiday } from '../../core/holiday';
import { CommonModule } from '@angular/common';
import { Fichaje } from "../../shared/fichaje/fichaje";
import { Time } from "../../shared/time/time";
import { Calendar } from "../../shared/calendar/calendar";
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Fichaje, Time, Calendar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  name_holiday: string = '';
  date_holiday: Date | null = null;
  date_format: any;
  holiday!: any;
  date_today!: any;
  currentYear!: any;
  isNacionalHoliday: boolean = false;
  today: Date = new Date();
  upcomingBirthdays: any[] = [];
  todayBirthdays: any[] = [];
@ViewChildren('birthdayCard') birthdayCards!: QueryList<ElementRef>;


  allBirthdays = [
  {
    name: 'Laura Gómez',
    position: 'Recursos Humanos',
    day: 19,
    month: 2,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Carlos Martínez',
    position: 'Desarrollador',
    day: 23,
    month: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Ana López',
    position: 'Marketing',
    day: 27,
    month: 2,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Florencia Macarena Sandoval Pérez',
    position: 'Diseñadora UX/UI',
    day: 15,
    month: 10,
    avatar: '../../../assets/profile.png'
  },
  
];

birthdays: any[] = [];

  constructor(private holidayService: Holiday) { }
  ngOnInit() {
    this.currentYear = new Date().getFullYear();

    this.holidayService.getHolidays(this.currentYear).subscribe((data: any) => {
      this.date_today = new Date();
      this.date_today.setHours(0, 0, 0, 0);
      this.holiday = data.filter((holiday: any) => {
          const fechaFestivo = new Date(holiday.startDate);
          return fechaFestivo >= this.date_today;
        }).slice(0, 3).map((holiday: any) => {
          const day = new Date(holiday.startDate).toLocaleDateString('es-ES', {
            day: 'numeric',
          });

          const month = new Date(holiday.startDate).toLocaleDateString('es-ES', {
            month: 'long',
          });

          const year = new Date(holiday.startDate).toLocaleDateString('es-ES', {
            year: 'numeric',
          });


          this.name_holiday =
            holiday.name?.find((name: any) => name.language === 'es')?.text ||
            holiday.name[0]?.text ||
            'Nombre no disponible';

        
          return {
            name: this.name_holiday,
            day: day,
            month: month,
            year: year,
            isNacionalHoliday: holiday.nationwide === true 
          };
        });
    });

   
this.calculateUpcomingBirthdays();

setInterval(() => {
  this.calculateUpcomingBirthdays();
}, 60000);

  }

   calculateUpcomingBirthdays() {
  const today = new Date();

  // Eliminamos hora (clave para que no falle)
  const todayClean = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  this.birthdays = this.allBirthdays
    .map(person => {

      let nextBirthday = new Date(
        todayClean.getFullYear(),
        person.month - 1,
        person.day
      );

      // Si ya pasó este año → lo pasamos al siguiente
      if (nextBirthday < todayClean) {
        nextBirthday = new Date(
          todayClean.getFullYear() + 1,
          person.month - 1,
          person.day
        );
      }

      const diffTime = nextBirthday.getTime() - todayClean.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...person,
        daysLeft: diffDays,
        monthName: nextBirthday.toLocaleDateString('es-ES', {
          month: 'long'
        })
      };
    })
    .filter(person => person.daysLeft >= 0) 
    .sort((a, b) => a.daysLeft - b.daysLeft) 
    .slice(0, 5); 

      this.todayBirthdays = this.birthdays.filter(b => b.daysLeft === 0);
  this.upcomingBirthdays = this.birthdays.filter(b => b.daysLeft > 0);
}
ngAfterViewInit() {
  if (this.birthdays.length > 0) {
    setTimeout(() => {
      this.birthdayCards.forEach(card => {
        this.launchConfetti(card.nativeElement);
      });
    }, 300);
  }
}


launchConfetti(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  const origin = {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight
  };

  confetti({
    particleCount: 40,
    spread: 50,
    startVelocity: 25,
    gravity: 1,
    scalar: 0.8,
    colors: ['#FFD700', '#FFF5CC', '#E6C200'],
    origin: origin,
    zIndex: 9999
  });
}

}
