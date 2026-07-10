import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TabletAuth } from '../../../../core/services/tablet-auth';
import { HistorialFichajeEmpleado } from '../../../../core/interfaces/historialFichajeEmpleado.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-time',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-time.html',
  styleUrl: './view-time.css',
})
export class ViewTime {
  
  private route = inject(ActivatedRoute);
  employeeData:HistorialFichajeEmpleado[] = [];
  employeedDataFiltered:HistorialFichajeEmpleado[] = [];
  paginaActual = 1;
elementosPorPagina = 10;
nameEmployee: string = localStorage.getItem('nameEmployee') || '';
apellidoEmployee: string = localStorage.getItem('apellidoEmployee') || '';
fechaSeleccionada:any;
  constructor(private TabletAuth: TabletAuth, private router: Router) {}
  ngOnInit() {
 const idEmployee = Number(this.route.snapshot.paramMap.get('id'));

    this.cargarHistorial(idEmployee)
  }

  cargarHistorial(idEmployee: any) {
    this.TabletAuth.getHistorialEmpleado(idEmployee)
      .subscribe({
        next: (data) => {
          this.employeeData = data;
          this.employeedDataFiltered = [...data];
          console.log('Historial del empleado:', this.employeedDataFiltered);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    filtrarPorFecha() {

  this.employeedDataFiltered = this.employeeData.filter(f =>
    f.date === this.fechaSeleccionada
  );

}

  formatHour(hour: string): string {
  return hour?.slice(0, 5) ?? '';
}

    volver() {
    this.router.navigate(['admin/list-employees']);
    localStorage.removeItem('nameEmployee');
    localStorage.removeItem('apellidoEmployee');
  }

  get totalPaginas(): number {
  return Math.ceil(
    this.employeedDataFiltered.length / this.elementosPorPagina
  );
}

get fichajesPaginados() {
  const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
  const fin = inicio + this.elementosPorPagina;

  return this.employeedDataFiltered.slice(inicio, fin);
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
}
