import { Component, signal } from '@angular/core';
import{ Nominas } from '../../core/interfaces/nomina.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nomina',
  imports: [FormsModule],
  templateUrl: './nomina.html',
  styleUrl: './nomina.css',
})
export class Nomina {

exportModalOpen = false;
nomina: Nominas[] = [
  { archivo: new Date(2026, 1, 10), periodo: 'Enero 2026', tipo: 'Ordinaria', fechaEmision: new Date(2026, 1, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2026, 0, 10), periodo: 'Diciembre 2025', tipo: 'Ordinaria', fechaEmision: new Date(2026, 0, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2025, 11, 10), periodo: 'Noviembre 2025', tipo: 'Ordinaria', fechaEmision: new Date(2025, 11, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2025, 10, 10), periodo: 'Octubre 2025', tipo: 'Ordinaria', fechaEmision: new Date(2025, 10, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2025, 9, 10), periodo: 'Septiembre 2025', tipo: 'Ordinaria', fechaEmision: new Date(2025, 9, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2025, 8, 10), periodo: 'Agosto 2025', tipo: 'Ordinaria', fechaEmision: new Date(2025, 8, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2025, 7, 10), periodo: 'Julio 2025', tipo: 'Ordinaria', fechaEmision: new Date(2025, 7, 15), estado: 'Disponible', accion: 'Descargar' },

];
selectedYear = signal(new Date().getFullYear());
currentPage = 1;
itemsPerPage = 6;

get totalPages(): number {
  return Math.ceil(this.nomina.length / this.itemsPerPage);
}

get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

get paginatedNominas() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.nomina.slice(start, start + this.itemsPerPage);
}

changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
}

formatearFecha(fecha: Date): string {
  return new Date(fecha).toLocaleDateString('es-ES');
}


openExportModal() {
  this.exportModalOpen = true;  
}
closeExportModal() {
  this.exportModalOpen = false;  
}

downloadNominas() {
  console.log(`Descargando nóminas del año ${this.selectedYear()}`);  
}

}
