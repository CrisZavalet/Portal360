import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados {

searchTerm: string = '';

empleados = [
  {
    nombre: 'Florencia Sandoval',
    cargo: 'Desarrolladora',
    email: 'florencia.sandoval@empresa.com',
    telefono: '555-1234',
    estado: 'Activo'
  },
  {
    nombre: 'Juan Pérez',
    cargo: 'Diseñador',
    email: 'juan.perez@empresa.com',
    telefono: '555-5678',
    estado: 'Inactivo'
  }
];
empleadosFiltrados() {
  return this.empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.cargo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


getEstadoClase(estado: string): string {
  return estado === 'Activo'
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';
}
}
