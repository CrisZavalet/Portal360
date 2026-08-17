import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentos-empleado',
  imports: [FormsModule, CommonModule],
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

  filtrarNominas() {
    const search = this.searchTerm.toLowerCase();

    this.documentosFiltrados = this.documentos.filter(
      (d) =>
        d.empleado.toLowerCase().includes(search) ||
        d.mes.toLowerCase().includes(search) ||
        d.anio.toString().includes(search),
    );
  }

  subirNomina(): void {
    this.modalVisible = true;
  }

  cerrarNomina(): void {
    this.modalVisible = false;
  }
}
