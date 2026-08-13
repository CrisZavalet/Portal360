import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { HistorialFichajeEmpleado } from '../../../core/interfaces/historialFichajeEmpleado.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
 import { saveAs } from 'file-saver';
@Component({
  selector: 'app-fichaje-empleado',
  imports: [CommonModule,FormsModule],
  templateUrl: './fichaje-empleado.html',
  styleUrl: './fichaje-empleado.css',
})
export class FichajeEmpleado {
id: any;
empleadoselectado: any;
jornada = 8;
//  empleado :any;
totalHoras: any;
tipo: any;
fichajes :HistorialFichajeEmpleado[] = [];
fichajesFiltrados: HistorialFichajeEmpleado[] = [];
  mesSeleccionado = signal(new Date().getMonth());
anioSeleccionado = signal(new Date().getFullYear());
  menuOpen = false;
exportModalOpen = false;
exportType: string = 'pdf';
startDate!: string;
endDate!: string;
constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
ngOnInit() {
  
    this.id = this.route.snapshot.params['id'];
    console.log('ID del empleado:', this.id);
  if (this.id) {

    this.datosEmpleado(this.id);
    this.fichajeEmpleado(this.id);
  }
 }

datosEmpleado (id: any) {

  this.authService.getEmployeeById(id).subscribe({
    next: (data) => {
      this.empleadoselectado = data;
      
      console.log('Datos del empleado:', this.empleadoselectado);
    },
    error: (err) => {
console.error('STATUS:', err.status);
  console.error('ERROR BACKEND:', err.error);    }
  });
 
}


fichajeEmpleado (id:any){
  this.authService.getHistorialEmpleado(id).subscribe({
    next: (data) => {
      this.fichajes = data;
      this.filtrarPorMes();
    },
    error: (err) => {
      console.error(err);
    }
  });


}

horasTrabajadas(entrada: string, salida: string): string {

  if (!entrada || !salida) return '0 h 0 min';

  const [h1, m1] = entrada.split(':').map(Number);
  const [h2, m2] = salida.split(':').map(Number);

  const inicio = h1 * 60 + m1;
  const fin = h2 * 60 + m2;

  const diferencia = fin - inicio;

  const horas = Math.floor(diferencia / 60);
  const minutos = diferencia % 60;

  return `${horas} h ${minutos} min`;
}



  formatHour(hour: string): string {
  return hour?.slice(0, 5) ?? '';
}


aprobarFichaje(f: any) {
  f.aprobado = true;
  console.log('Fichaje aprobado:', f);
}


rechazarFichaje(f: any) {
  f.aprobado = false;
  console.log('Fichaje rechazado:', f);
}



volver() {
  this.router.navigate(['/employees']);
}



cambiarEstado(
  fichaje: HistorialFichajeEmpleado,
  nuevoEstado: string
): void {

   const estado = nuevoEstado === 'NULL'
    ? null
    : nuevoEstado;


  console.log('ID fichaje:', fichaje.idClocking);
  console.log('Nuevo estado:', estado);

  this.authService
    .updateAprobadoStatus(fichaje.idClocking, estado as string)
    .subscribe({
      next: (respuesta) => {

        console.log('Estado actualizado:', respuesta);

        // Actualizamos el objeto local
        fichaje.aprobado = estado;
      },

      error: (error) => {
        console.error('Error al actualizar el estado:', error);
      }
    });
}

mostrarEstadoAprobacion(aprobado: string | null): string {
  if (aprobado === 'APROBADO') {
    return 'Aprobado';
  }

  if (aprobado === 'NO_APROBADO') {
    return 'No aprobado';
  }

  return 'Pendiente';
}

filtrarPorMes() {
  this.fichajesFiltrados = this.fichajes.filter(f => {
    const fecha = new Date(f.date);

    return (
      fecha.getMonth() === this.mesSeleccionado() &&
      fecha.getFullYear() === this.anioSeleccionado()
    );
  });
}

formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split('-').map(Number);

  return new Date(anio, mes - 1, dia).toLocaleDateString('es-ES');
}


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

openExportModal() {
  this.menuOpen = false;
  this.exportModalOpen = true;
}

closeExportModal() {
  this.exportModalOpen = false;
}

exportData() {

  const datos = this.obtenerDatosExportar();

  if (datos.length === 0) {
    alert('No hay fichajes para exportar.');
    return;
  }

  switch (this.exportType) {

    case 'pdf':
      this.exportarPDF(datos);
      break;

    case 'excel':
      this.exportarExcel(datos);
      break;

    case 'csv':
      this.exportarCSV(datos);
      break;
  }

  this.closeExportModal();
}

obtenerDatosExportar(): HistorialFichajeEmpleado[] {

  let datos = [...this.fichajes];

  if (this.startDate) {
    datos = datos.filter(f => f.date >= this.startDate);
  }

  if (this.endDate) {
    datos = datos.filter(f => f.date <= this.endDate);
  }

  return datos;

}

exportarPDF(datos: HistorialFichajeEmpleado[]) {

  const pdf = new jsPDF();

  pdf.text('Historial de fichajes', 14, 15);
  pdf.setFontSize(10);
  pdf.text('Empleado: ' + this.empleadoselectado?.name + ' ' + this.empleadoselectado?.lastName, 14, 22);
  autoTable(pdf, {
 startY: 30,
    head: [[
      'Fecha',
      'Entrada',
      'Salida',
      'Tiempo',
      'Estado',
      'Aprobado'
    ]],

    body: datos.map(f => [

      this.formatearFecha(f.date),

      this.formatHour(f.startHour),

      this.formatHour(f.endHour),

      this.horasTrabajadas(f.startHour, f.endHour),

      f.status,

      this.getEstadoTexto(f.aprobado)

    ])

  });

  pdf.save('historial-fichajes.pdf');

}

exportarExcel(datos: HistorialFichajeEmpleado[]) {

  const worksheet = XLSX.utils.json_to_sheet(

    datos.map(f => ({

      Fecha: this.formatearFecha(f.date),

      Entrada: this.formatHour(f.startHour),

      Salida: this.formatHour(f.endHour),

      Tiempo: this.horasTrabajadas(f.startHour, f.endHour),

      Estado: f.status,

      Aprobado: this.getEstadoTexto(f.aprobado)

    }))

  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Fichajes');

  XLSX.writeFile(workbook, 'historial-fichajes.xlsx');

}

exportarCSV(datos: HistorialFichajeEmpleado[]) {

  const worksheet = XLSX.utils.json_to_sheet(

    datos.map(f => ({

      Fecha: this.formatearFecha(f.date),

      Entrada: this.formatHour(f.startHour),

      Salida: this.formatHour(f.endHour),

      Tiempo: this.horasTrabajadas(f.startHour, f.endHour),

      Estado: f.status,
      
      Aprobado: this.getEstadoTexto(f.aprobado)

    }))

  );

  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8'
  });

  saveAs(blob, 'historial-fichajes.csv');

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

getEstadoTexto(aprobado: string | null): string {
  if (aprobado === 'APROBADO') {
    return 'Aprobado';
  } else if (aprobado === 'NO_APROBADO') {
    return 'No aprobado';
  } else {
    return 'Pendiente';
  }
}
}
