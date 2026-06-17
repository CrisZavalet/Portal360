import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nomina-empleado',
  imports: [CommonModule,FormsModule],
  templateUrl: './nomina-empleado.html',
  styleUrl: './nomina-empleado.css',
})
export class NominaEmpleado {
busqueda = '';
modalVisible = false;
mesNomina = '';
archivoSeleccionado: File | null = null;
  id:any;
  empleadoselectado: any;
  searchTerm = '';
  nominasFiltradas: any[] = [];
nominas: any[] = [];
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

  constructor( private route: ActivatedRoute, private router: Router) {}
ngOnInit() {
  
    this.id = this.route.snapshot.params['id'];
    console.log('ID del empleado:', this.id);
  if (this.id) {
    this.datosEmpleado(this.id);
  }
 }

datosEmpleado (id: any) {
  this.empleadoselectado = this.empleado.find((e) => e.id == id);
  console.log(this.empleadoselectado);
}

 volver() {
  this.router.navigate(['/employees']);
}

filtrarNominas() {
  const search = this.searchTerm.toLowerCase();

  this.nominasFiltradas = this.nominas.filter(n =>
    n.empleado.toLowerCase().includes(search) ||
    n.mes.toLowerCase().includes(search) ||
    n.anio.toString().includes(search)
  );
}

subirNomina(): void {
  this.modalVisible = true;
}

cerrarNomina(): void {
  this.modalVisible = false;      
}

guardarNomina(): void {
   if (!this.archivoSeleccionado) {
    alert('Selecciona un PDF');
    return;
  }

  const formData = new FormData();

  formData.append('archivo', this.archivoSeleccionado);
  formData.append('mes', this.mesNomina);
  formData.append('empleadoId', this.empleadoselectado.id);

  // llamada API

  this.cerrarNomina()
}

onFileSelected(event: any) {
  this.archivoSeleccionado = event.target.files[0];
}
}
