import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Holiday } from '../../core/services/holiday';
import { CommonModule } from '@angular/common';
import { Fichaje } from "../../shared/fichaje/fichaje";
import { Time } from "../../shared/time/time";
import { Calendar } from "../../shared/calendar/calendar";
import confetti from 'canvas-confetti';
import { AuthService } from '../../core/services/auth-service';
import { EmpleadoData } from '../../core/interfaces/empleadoData.interface';

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
  name_user:any;
  suername_user:any;
  rol_user:any;
  user: any;
  idEmployee: any;
  @ViewChildren('birthdayCard') birthdayCards!: QueryList<ElementRef>;
  empleados:any;


birthdays: any[] = [];

  constructor(private holidayService: Holiday,private authService: AuthService) { }
  ngOnInit() {

    this.idEmployee = localStorage.getItem('idEmployee');
    this.user = localStorage.getItem('user');
    
    console.log('Usuario obtenido desde el servicio AuthService:', this.user);

    if (this.user) {
      this.authService.getEmployeeById(parseInt(this.idEmployee)).subscribe((employee: any) => {
        this.name_user = employee.name;
        this.suername_user = employee.lastName;
        this.rol_user = employee.role;
      });
    } else {
      console.log('No se encontró información del usuario en el localStorage.');
    }

    this.currentYear = new Date().getFullYear();

    this.authService.getEmployeeRoles().subscribe({
  next: (data: EmpleadoData[]) => {
    console.log('Empleados para cumpleaños:', data);

    this.empleados = data;

    this.calculateUpcomingBirthdays();
  },
  error: (error) => {
    console.error('Error al obtener los empleados:', error);
  }
});

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

   

setInterval(() => {
  this.calculateUpcomingBirthdays();
}, 60000);

  }

  calculateUpcomingBirthdays() {

  const today = new Date();

  const todayClean = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  this.birthdays = this.empleados

    // Solo empleados activos y con fecha de nacimiento
    .filter((employee:any) =>
      employee.active &&
      employee.dateOfBirth
    )

    .map((employee:any) => {

      const birthDate = new Date(employee.dateOfBirth);

      const day = birthDate.getDate();
      const month = birthDate.getMonth();

      let nextBirthday = new Date(
        todayClean.getFullYear(),
        month,
        day
      );

      // Si ya pasó este año, buscamos el del año siguiente
      if (nextBirthday < todayClean) {

        nextBirthday = new Date(
          todayClean.getFullYear() + 1,
          month,
          day
        );

      }

      const diffTime =
        nextBirthday.getTime() - todayClean.getTime();

      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      return {

        // Datos de la API
        idEmployee: employee.idEmployee,
        name: `${employee.name} ${employee.lastName}`,
        position: employee.position,

        // Datos calculados
        day: day,
        monthName: nextBirthday.toLocaleDateString('es-ES', {
          month: 'long'
        }),

        daysLeft: diffDays,

        // Por ahora mantenemos tu imagen
        avatar: '../../../assets/profile.png'

      };

    })

    .filter((person:any) => person.daysLeft >= 0)

    .sort((a:any, b:any) => a.daysLeft - b.daysLeft)

    .slice(0, 5);


  this.todayBirthdays =
    this.birthdays.filter((b:any) => b.daysLeft === 0);


  this.upcomingBirthdays =
    this.birthdays.filter((b:any) => b.daysLeft > 0);


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
