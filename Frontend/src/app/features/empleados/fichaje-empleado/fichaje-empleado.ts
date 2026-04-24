import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fichaje-empleado',
  imports: [CommonModule],
  templateUrl: './fichaje-empleado.html',
  styleUrl: './fichaje-empleado.css',
})
export class FichajeEmpleado {
// empleado: any;
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
 ]

fichajes = [
  { dia: 'Lunes', entrada: '08:00', salida: '17:00', estado: 'pendiente' },
  { dia: 'Martes', entrada: '08:15', salida: '17:30', estado: 'pendiente' },
];

// 🔹 Calcula horas trabajadas
horasTrabajadas(entrada: string, salida: string): number {
  if (!entrada || !salida) return 0;

  const [h1, m1] = entrada.split(':').map(Number);
  const [h2, m2] = salida.split(':').map(Number);

  const inicio = h1 * 60 + m1;
  const fin = h2 * 60 + m2;

  return (fin - inicio) / 60;
}

// 🔹 Determina si hay horas extra o falta tiempo
getEstadoFichaje(f: any): 'ok' | 'extra' | 'retraso' {
  const horas = this.horasTrabajadas(f.entrada, f.salida);

  if (horas > this.jornada) return 'extra';
  if (horas < this.jornada) return 'retraso';
  return 'ok';
}

// 🔹 Aprobar uno
aprobarFichaje(f: any) {
  f.estado = 'aprobado';
}

// 🔹 Rechazar uno
rechazarFichaje(f: any) {
  f.estado = 'rechazado';
}

// 🔹 Aprobar todos los pendientes
aprobarTodos() {
  this.fichajes = this.fichajes.map(f => {
    if (f.estado === 'pendiente') {
      return { ...f, estado: 'aprobado' };
    }
    return f;
  });
}

// 🔹 (Opcional PRO) Calcular horas extra exactas
horasExtra(f: any): number {
  return this.horasTrabajadas(f.entrada, f.salida) - this.jornada;
}

tienePendientes(): boolean {
  return this.fichajes?.some(f => f.estado === 'pendiente');
}

contadorPendientes(): number {
  return this.fichajes?.filter(f => f.estado === 'pendiente').length || 0;
}
}
