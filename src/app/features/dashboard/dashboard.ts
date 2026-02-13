import { Component } from '@angular/core';
import { Holiday } from '../../core/holiday';
import { CommonModule } from '@angular/common';
import { Fichaje } from "../../shared/fichaje/fichaje";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Fichaje,],
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

          console.log('Fecha del próximo festivo:', this.date_format);
          console.log('Nombre del próximo festivo:', this.name_holiday);
          return {
            name: this.name_holiday,
            day: day,
            month: month,
            year: year,
            isNacionalHoliday: holiday.nationwide === true 
          };
        });
    });
  }
}
