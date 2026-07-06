import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FichajeEmpleados } from '../../../core/interfaces/fichajeEmpleados.interface';

@Component({
  selector: 'app-view-admin',
  imports: [FormsModule],
  templateUrl: './view-admin.html',
  styleUrl: './view-admin.css',
})
export class ViewAdmin {
 fechaSeleccionada = this.formatearFecha(new Date());

  busqueda = '';

  fichajes: FichajeEmpleados[] = [];

  fichajesFiltrados: FichajeEmpleados[] = [];

ngOnInit() {
    this.cargarFichajes();
  }

  obtenerFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  cargarFichajes() {

    // Aquí llamarás al servicio

    this.fichajes = [
      {
        fecha: new Date('2026-07-06'),
        empleado: 'Juan Pérez',
        entrada: '08:00',
        salida: '17:00',
        horas: '9h'
      },
      {
        fecha: new Date(),
        empleado: 'María López',
        entrada: '08:15',
        salida: '17:15',
        horas: '9h'
      },
      {
        fecha: new Date(),
        empleado: 'Carlos Ruiz',
        entrada: '09:00',
        salida: '18:00',
        horas: '9h'
      },

    ];

    this.fichajesFiltrados = this.fichajes;

  }

  filtrar() {

    const texto = this.busqueda.toLowerCase();

    this.fichajesFiltrados = this.fichajes.filter(f =>
      f.empleado.toLowerCase().includes(texto)
    );

  }

  formatearFecha(fecha: Date): string {

    return new Date(fecha).toLocaleDateString('es-ES');


}


}

