import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-documentos-empleado',
  imports: [FormsModule, CommonModule,MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './documentos-empleado.html',
  styleUrl: './documentos-empleado.css',
})
export class DocumentosEmpleado {
  busqueda = '';
  modalVisible = false;
  mesDocumentacion = '';
  searchTerm = '';
  archivoSeleccionado: File | null = null;
  id: any;
  empleadoselecionado: any;
  documentosFiltrados: any[] = [];
  documentos: any[] = [];
  empleado: any;
  fecha = new Date();
tiposDocumentos = [
  'Contrato',
  'Documento',
  'Cursos'
  ];
estado = '';
estados = [
  { id: 'DISPONIBLE', nombre: 'Disponible' },
  { id: 'NO_DISPONIBLE', nombre: 'No disponible' }
];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('ID del empleado:', this.id);
    if (this.id) {
      this.datosEmpleado(this.id);
    }
  }

  datosEmpleado(id: any) {
    this.authService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.empleadoselecionado = data;

        console.log('Datos del empleado:', this.empleadoselecionado);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  volver() {
    this.router.navigate(['/employees']);
  }

  filtrarDocumentos() {
    const search = this.searchTerm.toLowerCase();

    this.documentosFiltrados = this.documentos.filter(
      (d) =>
        d.empleado.toLowerCase().includes(search) ||
        d.mes.toLowerCase().includes(search) ||
        d.anio.toString().includes(search),
    );
  }

  subirDocumento(): void {
    this.modalVisible = true;
  }

  cerrarDocumento(): void {
    this.modalVisible = false;
  }

  setMonthAndYear(date: Date, datepicker: any) {
  this.fecha = date;
  datepicker.close();
}

onFileSelected(event: any) {
  this.archivoSeleccionado = event.target.files[0];
}
guardarDocumento(): void {
   if (!this.archivoSeleccionado) {
    alert('Selecciona un PDF');
    return;
  }
}


}
