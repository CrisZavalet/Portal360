import { Component, computed, signal } from '@angular/core';
import { Fichajes } from '../../core/interfaces/fichaje.interface';
import { FormsModule } from '@angular/forms';
import { TabletAuth } from '../../core/services/tablet-auth';
import { HistorialFichajeEmpleado } from '../../core/interfaces/historialFichajeEmpleado.interface';
@Component({
  selector: 'app-fichaje',
  imports: [FormsModule, ],
  templateUrl: './fichaje.html',
  styleUrl: './fichaje.css',
})
export class Fichaje {
  open:any = false;
  menuOpen = false;
exportModalOpen = false;
exportType: string = 'pdf';
startDate!: string;
endDate!: string;
  employeeData:HistorialFichajeEmpleado[] = [];
  employeedDataFiltered:HistorialFichajeEmpleado[] = [];

constructor(private TabletAuth: TabletAuth) {}

ngOnInit() {
  const idEmployee = Number(localStorage.getItem('idEmployee'));
  this.cargarHistorial(idEmployee);


}

cargarHistorial(idEmployee: any) {
    this.TabletAuth.getHistorialEmpleado(idEmployee)
      .subscribe({
        next: (data) => {
          this.employeeData = data;
          this.filtrarPorMes();
          console.log('Historial del empleado:', this.employeedDataFiltered);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  formatHour(hour: string): string {
  return hour?.slice(0, 5) ?? '';
}

fichajes = signal<Fichajes[]>([
  { fecha: new Date(2026, 1, 10), entrada: '08:00', salida: '16:00', totalHoras: 8, aprobado: true },
  { fecha: new Date(2026, 1, 15), entrada: '09:00', salida: '17:30', totalHoras: 8.5, aprobado: false },
  { fecha: new Date(2026, 0, 20), entrada: '08:15', salida: '16:15', totalHoras: 8, aprobado: true }
]);

mesSeleccionado = signal(new Date().getMonth());
anioSeleccionado = signal(new Date().getFullYear());

fichajesFiltrados = computed(() => {
  return this.fichajes().filter(f => {
    const fecha = new Date(f.fecha);
    return (
      fecha.getMonth() === this.mesSeleccionado() &&
      fecha.getFullYear() === this.anioSeleccionado()
    );
  });
});

mesAnterior() {
  if (this.mesSeleccionado() === 0) {
    this.mesSeleccionado.set(11);
    this.anioSeleccionado.update(a => a - 1);
  } else {
    this.mesSeleccionado.update(m => m - 1);
  }

  this.filtrarPorMes();
}

mesSiguiente() {
  if (this.mesSeleccionado() === 11) {
    this.mesSeleccionado.set(0);
    this.anioSeleccionado.update(a => a + 1);
  } else {
    this.mesSeleccionado.update(m => m + 1);
  }

  this.filtrarPorMes();
}


formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split('-').map(Number);

  return new Date(anio, mes - 1, dia).toLocaleDateString('es-ES');
}
toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

openExportModal() {
  this.menuOpen = false;
  this.exportModalOpen = true;
}

closeExportModal() {
  this.exportModalOpen = false;
}

exportData() {
  console.log('Exportando:', {
    tipo: this.exportType,
    desde: this.startDate,
    hasta: this.endDate
  });

  // el service va aqui
  this.exportModalOpen = false;
}   

filtrarPorMes() {
  this.employeedDataFiltered = this.employeeData.filter(f => {
    const fecha = new Date(f.date);

    return (
      fecha.getMonth() === this.mesSeleccionado() &&
      fecha.getFullYear() === this.anioSeleccionado()
    );
  });
}

calcularTiempo(startHour: string, endHour: string): string {
  if (!startHour || !endHour) {
    return '--';
  }

  const inicio = new Date(`1970-01-01T${startHour}`);
  const fin = new Date(`1970-01-01T${endHour}`);

  const diferenciaMs = fin.getTime() - inicio.getTime();

  const horas = Math.floor(diferenciaMs / 1000 / 60 / 60);
  const minutos = Math.floor((diferenciaMs / 1000 / 60) % 60);

  return `${horas}h ${minutos}min`;
}
}
