import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-nomina-empleado',
  imports: [CommonModule,FormsModule,MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './nomina-empleado.html',
  styleUrl: './nomina-empleado.css',
})
export class NominaEmpleado {
busqueda = '';
nomina=[];
modalVisible = false;
mesNomina = '';
archivoSeleccionado: File | null = null;
  id:any;
  empleadoselectado: any;
  searchTerm = '';
  nominasFiltradas: any[] = [];
  estadoNomina = '';
  fecha = new Date();
tipoNomina = '';
estado = '';
estados = [
  { id: 'DISPONIBLE', nombre: 'Disponible' },
  { id: 'NO_DISPONIBLE', nombre: 'No disponible' }
];

tiposNomina = [
  'Ordinaria',
  'Extra',
  'Atrasos',
  'Liquidación'
];
nominas = [
  {periodo: 'Enero 2024', tipo: 'Ordinaria', fechaEmision: '2024-01-31', estado: 'Disponible', empleado: 'Florencia Macarena Sandoval Perez'},
  {periodo: 'Febrero 2024', tipo: 'Ordinaria', fechaEmision: '2024-02-29', estado: 'Disponible', empleado: 'Florencia Macarena Sandoval Perez'},
  {periodo: 'Marzo 2024', tipo: 'Ordinaria', fechaEmision: '2024-03-31', estado: 'Disponible', empleado: 'Florencia Macarena Sandoval Perez'},
  {periodo: 'Abril 2024', tipo: 'Ordinaria', fechaEmision: '2024-04-30', estado: 'Disponible', empleado: 'Florencia Macarena Sandoval Perez'},
  {periodo: 'Mayo 2024', tipo: 'Ordinaria', fechaEmision: '2024-05-31', estado: 'Disponible', empleado: 'Florencia Macarena Sandoval Perez'},

];
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
    usuario: 'fsandovalp',
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
     this.nominasFiltradas = [...this.nominas];
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
  const search = this.busqueda.toLowerCase();

  this.nominasFiltradas = this.nominas.filter(n =>
    n.periodo.toLowerCase().includes(search) ||
    n.tipo.toLowerCase().includes(search) ||
    n.fechaEmision.toString().includes(search)
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
  formData.append('tipo', this.tipoNomina);
  // llamada API

  this.cerrarNomina()
}

onFileSelected(event: any) {
  this.archivoSeleccionado = event.target.files[0];
}

setMonthAndYear(date: Date, datepicker: any) {
  this.fecha = date;
  datepicker.close();
}
}
