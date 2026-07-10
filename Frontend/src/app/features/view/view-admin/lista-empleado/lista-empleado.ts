import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabletAuth } from '../../../../core/services/tablet-auth';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../../../core/interfaces/empleado.interface';
@Component({
  selector: 'app-lista-empleado',
  imports: [FormsModule],
  templateUrl: './lista-empleado.html',
  styleUrl: './lista-empleado.css',
})
export class ListaEmpleado {
paginaActual = 1;
elementosPorPagina = 10;
empleados: Empleado[] = [];
  busqueda = '';
empleadosFiltrados: Empleado[]= [];
constructor( private TabletAuth: TabletAuth,private router:Router) {}

ngOnInit() {
  this.ObtenerEmpleados();
  }

ObtenerEmpleados() {
    this.TabletAuth.getDatosEmpleados()
      .subscribe({

        next: (data) => {

          console.log('Empleados:', data);
          this.empleados = data;
                this.empleadosFiltrados = [...data];


        },

        error: (err) => {

          console.error(err);

        }

      });


  }

   filtrar() {

  const texto = this.busqueda.toLowerCase();

  this.empleadosFiltrados = this.empleados.filter((e: any) =>
      `${e.name} ${e.lastName}`.toLowerCase().includes(texto)
  );

  this.paginaActual = 1;

}
get totalPaginas(): number {
  return Math.ceil(
    (this.empleadosFiltrados?.length ?? 0) / this.elementosPorPagina
  );

}

get empleadosPaginados() {
  if (!this.empleadosFiltrados) {
    return [];
  }

  const inicio = (this.paginaActual - 1) * this.elementosPorPagina;

  return this.empleadosFiltrados.slice(
    inicio,
    inicio + this.elementosPorPagina
  );
}

 verHistorial(idEmployee: any) {
    this.router.navigate(['admin/employee/', idEmployee]);
    localStorage.setItem('nameEmployee', this.empleados.find(e => e.idEmployee === idEmployee)?.name || '');
    localStorage.setItem('apellidoEmployee', this.empleados.find(e => e.idEmployee === idEmployee)?.lastName || '');
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

volver() {
    this.router.navigate(['admin/view-time']);
  }


}
