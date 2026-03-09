import { Component, computed, signal } from '@angular/core';
import { Fichajes } from '../../core/interfaces/fichaje.interface';
import { FormsModule } from '@angular/forms';

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
}

mesSiguiente() {
  if (this.mesSeleccionado() === 11) {
    this.mesSeleccionado.set(0);
    this.anioSeleccionado.update(a => a + 1);
  } else {
    this.mesSeleccionado.update(m => m + 1);
  }
}

formatearFecha(fecha: Date): string {
  return new Date(fecha).toLocaleDateString('es-ES');
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
}
