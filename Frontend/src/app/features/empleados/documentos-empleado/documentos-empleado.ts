import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-documentos-empleado',
  imports: [],
  templateUrl: './documentos-empleado.html',
  styleUrl: './documentos-empleado.css',
})
export class DocumentosEmpleado {
busqueda = '';
modalVisible = false;
mesDocumentacion = '';
searchTerm = '';
archivoSeleccionado: File | null = null;
id:any;
  empleadoselectado: any;
  documentosFiltrados: any[] = [];
documentos: any[] = [];
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
    email: 'florencia.sandoval@example.com',
    telefono: '555-1234',
    estado: 'Activo',
    usuario: 'fsandovalp',
  },
{   id: 2,
    nombre: 'Juan',
    apellido: 'Pérez',
    cargo: 'Diseñador',
    email: 'juan.perez@example.com',
    telefono: '555-5678',
    estado: 'Inactivo',
    usuario: 'jperez'
  } 

]

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('ID del empleado:', this.id);
  if (this.id) {
    this.datosEmpleado(this.id);
  }
  }

  datosEmpleado(id: any) {
      this.empleadoselectado = this.empleado.find((e) => e.id == id);
  console.log(this.empleadoselectado);
  }

   volver() {
  this.router.navigate(['/employees']);
}

filtrarNominas() {
  const search = this.searchTerm.toLowerCase();

  this.documentosFiltrados = this.documentos.filter(d =>
    d.empleado.toLowerCase().includes(search) ||
    d.mes.toLowerCase().includes(search) ||
    d.anio.toString().includes(search)
  );
}

}
