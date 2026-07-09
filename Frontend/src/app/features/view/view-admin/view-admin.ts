import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FichajeEmpleados } from '../../../core/interfaces/fichajeEmpleados.interface';
import { TabletAuth } from '../../../core/services/tablet-auth';
import { EmpleadoFichaje } from '../../../core/interfaces/empleadoFichaje.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  imports: [FormsModule],
  templateUrl: './view-admin.html',
  styleUrl: './view-admin.css',
})
export class ViewAdmin {
 fechaSeleccionada = this.formatearFecha(new Date());

  busqueda = '';

  fichajes: EmpleadoFichaje[] = [];

  fichajesFiltrados: EmpleadoFichaje[] = [];

  paginaActual = 1;
elementosPorPagina = 10;
constructor( private TabletAuth: TabletAuth,private router:Router) {}

ngOnInit() {
    this.cargarFichajes();

  }

  obtenerFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  cargarFichajes() {


    this.TabletAuth.getEmpleadosFichaje()
      .subscribe({

        next: (data) => {

          this.fichajes = data;
          this.fichajesFiltrados = data;

        },

        error: (err) => {

          console.error(err);

        }

      });



  

    this.fichajesFiltrados = this.fichajes;
    console.log('Fichajes cargados:', this.fichajes);

    

  }

 filtrar() {

  const texto = this.busqueda.toLowerCase();

  this.fichajesFiltrados = this.fichajes.filter(f =>
      `${f.name} ${f.lastName}`.toLowerCase().includes(texto)
  );

  this.paginaActual = 1;

}

  formatearFecha(fecha: Date): string {

    return new Date(fecha).toLocaleDateString('es-ES');


}


get totalPaginas(): number {
  return Math.ceil(
    this.fichajesFiltrados.length / this.elementosPorPagina
  );
}

get fichajesPaginados() {
  const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
  const fin = inicio + this.elementosPorPagina;

  return this.fichajesFiltrados.slice(inicio, fin);
}


paginaAnterior() {
  if (this.paginaActual > 1) {
    this.paginaActual--;
  }
}

paginaSiguiente() {
  if (this.paginaActual < this.totalPaginas) {
    this.paginaActual++;
  }
}

listaEmpleado(){
  this.router.navigate(['/admin/list-employees']);
}


}
