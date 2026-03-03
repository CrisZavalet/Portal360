import { Component } from '@angular/core';
import{ Nominas } from '../../core/interfaces/nomina.interface';
@Component({
  selector: 'app-nomina',
  imports: [],
  templateUrl: './nomina.html',
  styleUrl: './nomina.css',
})
export class Nomina {

exportModalOpen = false;
nomina: Nominas[] = [
  { archivo: new Date(2026, 1, 10), periodo: 'Enero 2026', tipo: 'Ordinaria', fechaEmision: new Date(2026, 1, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2026, 0, 10), periodo: 'Diciembre 2025', tipo: 'Ordinaria', fechaEmision: new Date(2026, 0, 15), estado: 'Disponible', accion: 'Descargar' },
  { archivo: new Date(2025, 11, 10), periodo: 'Noviembre 2025', tipo: 'Ordinaria', fechaEmision: new Date(2025, 11, 15), estado: 'Disponible', accion: 'Descargar' }
];


formatearFecha(fecha: Date): string {
  return new Date(fecha).toLocaleDateString('es-ES');
}


openExportModal() {
  this.exportModalOpen = true;  
}
closeExportModal() {
  this.exportModalOpen = false;  
}

}
