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


//  <th class="p-4 text-left">Archivo</th>
//             <th class="p-4 text-left">Periodo</th>
//             <th class="p-4 text-left">Tipo</th>
//             <th class="p-4 text-left">Fecha emision</th>
//             <th class="p-4 text-left">Estado</th>
//             <th class="p-4 text-left">Acción</th>


//  <tbody>
//           @for (n of paginatedNominas; track n) {
    //  <tr class="border-t border-white/10 hover:bg-white/20 transition">
    //           <td class="px-3 py-2 md:p-4 whitespace-nowrap">{{ formatearFecha(n.archivo) }}</td>
    //           <td class="px-3 py-2 md:p-4 whitespace-nowrap">{{ n.periodo }}</td>
    //           <td class="px-3 py-2 md:p-4 whitespace-nowrap">{{ n.tipo }}</td>
    //           <td class="px-3 py-2 md:p-4 whitespace-nowrap">{{ formatearFecha(n.fechaEmision) }}</td>
    //           <td class="px-3 py-2 md:p-4 whitespace-nowrap">{{ n.estado }}</td>
    //           <td class="px-3 py-2 md:p-4 whitespace-nowrap gap-2 flex">
    //               <button class="px-1 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"><img src="./assets/icons/eye-outline.svg" alt="Ver" srcset=""></button>
    //       <button class="px-1 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"><img src="./assets/icons/download.svg" alt="Descargar" (click)="downloadNominas()" srcset="" ></button>
    //           </td>
    //         </tr>     }
        // </tbody>