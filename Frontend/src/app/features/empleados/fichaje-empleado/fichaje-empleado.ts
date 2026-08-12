import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { HistorialFichajeEmpleado } from '../../../core/interfaces/historialFichajeEmpleado.interface';

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
      console.error(err);
    }
  });
 
}

fichajeEmpleado (id:any){
  this.authService.getHistorialEmpleado(id).subscribe({
    next: (data) => {
      this.fichajes = data;
                this.filtrarPorMes();

      console.log('Historial del empleado:', this.fichajes);
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


// getEstadoFichaje(f: any): 'ok' | 'extra' | 'retraso' {
//   const horas = this.horasTrabajadas(f.entrada, f.salida);

//   if (horas > this.jornada) return 'extra';
//   if (horas < this.jornada) return 'retraso';
//   return 'ok';
// }

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

cambiarEstado(fichaje: any, estado: string) {
  fichaje.estado = estado;

  switch (estado) {
    case 'APROBADO':
      this.aprobarFichaje(fichaje);
      break;

    case 'RECHAZADO':
      this.rechazarFichaje(fichaje);
      break;

    case 'PENDIENTE':
      break;
  }
}

// aprobarTodos() {
//   this.fichajes.forEach(fichaje => {
//     if (fichaje.estado === 'pendiente') {
//       fichaje.estado = 'aprobado';
//     }
//   });
// }

// tienePendientes(): boolean {
//   return this.fichajes.some(
//     fichaje => fichaje.estado === 'pendiente'
//   );
// }

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


}
