import { Component, signal } from '@angular/core';
import { Contrato } from '../../core/interfaces/documentos.interface';

@Component({
  selector: 'app-documento',
  imports: [],
  templateUrl: './documento.html',
  styleUrl: './documento.css',
})
export class Documento {

exportModalOpen = false;


  contratos = signal<Contrato[]>([
    { fecha: new Date(2026, 1, 10), tipo: 'Contrato', estado: 'Vigente', accion: 'Ver' },
    { fecha: new Date(2024, 1, 10), tipo: 'Contrato', estado: 'Vigente', accion: 'Ver' },
  ]);
  

selectedYear = signal(new Date().getFullYear());
currentPage = 1;
itemsPerPage = 6;

get totalPages(): number {
  return Math.ceil(this.contratos.length / this.itemsPerPage);
}

get pages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

get paginatedContratos() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.contratos().slice(start, start + this.itemsPerPage);
}

formatearFecha(fecha: Date): string {
  return new Date(fecha).toLocaleDateString('es-ES');  
}

openExportModal() {
  this.exportModalOpen = true;  
}

closeExportModal() {
  this.exportModalOpen = false;  }
}
