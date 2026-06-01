import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fichaje-empleado',
  imports: [CommonModule],
  templateUrl: './fichaje-empleado.html',
  styleUrl: './fichaje-empleado.css',
})
export class FichajeEmpleado {
// empleado: any;
id: any;
empleadoselectado: any;
jornada = 8;
 empleado = [
  {
    id: 1,
    nombre: 'Florencia Macarena',
    apellido: 'Sandoval Perez',
     direccion: 'Calle Falsa 123',
     nacimiento: '1994-10-15',
     ubicacion: 'Madrid',
     iban: 'ES7620770024003102575766',
     departamento: 'IT',
     puesto: 'Diseñadora UX/UI',
     fechaInicio: '2024-02-03',
    cargo: 'Desarrolladora',
    email: 'florenciasandoval@quazzartech.com',
    telefono: '555-1234',
    estado: 'Activo',
    usuario: 'fsanp',
  },

{
   id: 2,
    nombre: 'Juan',
    apellido: 'Pérez',
    cargo: 'Diseñador',
    email: 'juan.perez@empresa.com',
    telefono: '555-5678',
    estado: 'Inactivo'

  },

 ]

fichajes = [
 { id: 1, fecha: new Date(2026, 1, 10), entrada: '08:00', salida: '16:00', totalHoras: 8, estado: 'pendiente' },
  { id: 2, fecha: new Date(2026, 1, 15), entrada: '09:00', salida: '17:30', totalHoras: 8.5, estado: 'pendiente' },
  { id: 3, fecha: new Date(2026, 0, 20), entrada: '08:15', salida: '16:15', totalHoras: 8, estado: 'pendiente' }
];

constructor( private route: ActivatedRoute) {}
ngOnInit() {
  
    this.id = this.route.snapshot.params['id'];
    console.log('ID del empleado:', this.id);
  if (this.id) {
    // this.loadFleetDetails(this.id);
    // this.loadCallOut()
    this.datosEmpleado(this.id);

  }
 }

datosEmpleado (id: any) {
  //  this.empleado.find((e) => e.id == id);
  this.empleadoselectado = this.empleado.find((e) => e.id == id);
  console.log(this.empleadoselectado);
}


horasTrabajadas(entrada: string, salida: string): number {
  if (!entrada || !salida) return 0;

  const [h1, m1] = entrada.split(':').map(Number);
  const [h2, m2] = salida.split(':').map(Number);

  const inicio = h1 * 60 + m1;
  const fin = h2 * 60 + m2;

  return (fin - inicio) / 60;
}


getEstadoFichaje(f: any): 'ok' | 'extra' | 'retraso' {
  const horas = this.horasTrabajadas(f.entrada, f.salida);

  if (horas > this.jornada) return 'extra';
  if (horas < this.jornada) return 'retraso';
  return 'ok';
}


aprobarFichaje(f: any) {
  f.aprobado = true;
  console.log('Fichaje aprobado:', f);
}


rechazarFichaje(f: any) {
  f.aprobado = false;
  console.log('Fichaje rechazado:', f);
}

// 🔹 Aprobar todos los pendientes
// aprobarTodos() {
//   this.fichajes = this.fichajes.map(f => {
//     if (f. === true) {
//       return { ...f, aprobado: true };
//     }
//     return f;
//   });
// }

// // 🔹 (Opcional PRO) Calcular horas extra exactas
// horasExtra(f: any): number {
//   return this.horasTrabajadas(f.entrada, f.salida) - this.jornada;
// }

// tienePendientes(): boolean {
//   return this.fichajes?.some(f => f.aprobado === false) || false;
// }

// contadorPendientes(): number {
//   return this.fichajes?.filter(f => f.aprobado === false).length || 0;
// }

formatearFecha(fecha: Date): string {
  return new Date(fecha).toLocaleDateString('es-ES');
}
}
