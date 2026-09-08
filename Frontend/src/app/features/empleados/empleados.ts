import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Fichaje } from "../fichaje/fichaje";
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoData } from '../../core/interfaces/empleadoData.interface';
import { RouterLink } from '@angular/router';
import { EmpleadoCrear } from '../../core/interfaces/empleadoCrear.interface';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados {

  constructor(private fb: FormBuilder,  private route: ActivatedRoute
, private eRef: ElementRef, private router: Router, private toast: ToastService) {}
searchTerm: string = '';
openModalEmpleado = false;
modalOpen = false;
step = 1;
form: any;
auth = inject(AuthService);
role = this.auth.getRole();
open:any = false;
openId: number | null = null;
estadoFichaje: 'pendiente' | 'aprobado' | 'rechazado'| null = null;
openDropdownId:  'editar' | 'fichajes' | 'nomina' | 'documentos' | 'mensaje'| null = null;
empleadoSeleccionado: any = null;
empleados:EmpleadoData[] = [];
empleadoEstadoSeleccionado: EmpleadoData | null = null;
mostrarConfirmacionEstado = false;
accionEstado: 'activar' | 'desactivar' | null = null;
cambiandoEstado = false;


ngOnInit() {
this.form = this.fb.group({
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  direccion: [''],
  email: ['', [Validators.required, Validators.email]],
  telefono: [''],
  nacimiento: [''],
  ubicacion: [''],
  iban: [''],
  dni: ['', Validators.required],
  usuario: [''],
  estado: ['Activo', Validators.required],
  puesto: ['', Validators.required],
  fechaInicio: ['', Validators.required],
  rol: ['', Validators.required],
  password: ['', Validators.required],
});

this.CargarEmpleados();
}

CargarEmpleados() {
  this.auth.getEmployeeRoles().subscribe({
    next: (data) => {
      this.empleados = data;
      console.log('Empleados cargados:', this.empleados);
    },
    error: (err) => {
      console.error('Error al cargar empleados:', err);
    }
  });
}

empleadosFiltrados() {
  return this.empleados.filter((emp: any) =>
    emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.phone.includes(this.searchTerm)
  );
}


getEstadoClase(estado: boolean): string {
  return estado === true
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';
}

openModal() {
  this.openModalEmpleado = true;
}

closeModal() {
  this.form.reset();
   this.step = 1;
  this.openModalEmpleado = false;
}


nextStep() {
 
  this.form.markAllAsTouched();
  if (this.step === 1 && this.form.get('nombre')?.invalid) return;
  if (this.step === 1 && this.form.get('apellido')?.invalid) return;
  if (this.step === 1 && this.form.get('email')?.invalid) return;
  if (this.step === 1 && this.form.get('dni')?.invalid) return;
  if (this.step === 2 && this.form.get('puesto')?.invalid) return;
  if (this.step === 2 && this.form.get('fechaInicio')?.invalid) return;
  if (this.step === 2 && this.form.get('rol')?.invalid) return;
  if (this.step === 2) {
    this.generarUsuario();
  }

  this.step++;
}

prevStep() {
  this.step--;
}

generarUsuario() {
  const nombre = (this.form.value.nombre || '').trim().toLowerCase();
  const apellido = (this.form.value.apellido || '').trim().toLowerCase();

  const user = nombre + apellido.substring(0, 2);

  this.form.patchValue({
    usuario: user
  });

  this.generarPassword();
}

generarPassword() {
  const random = Math.random().toString(36).slice(-8);
  this.form.patchValue({ password: random, confirmPassword: random });
}

crearEmpleado() {
   this.form.markAllAsTouched();

  if (this.form.invalid) {
    return;
  }

  const empleado: EmpleadoCrear = {
     name: this.form.value.nombre,
    lastName: this.form.value.apellido,
    dni: this.form.value.dni,
    address: this.form.value.direccion,
    email: this.form.value.email,
    password: this.form.value.password,
    phone: this.form.value.telefono,
    dateOfBirth: this.form.value.nacimiento,
    location: this.form.value.ubicacion,
    iban: this.form.value.iban,
    idRole: Number(this.form.value.rol),
    idPosition: Number(this.form.value.puesto),
    startDate: this.form.value.fechaInicio,
    active: this.form.value.estado === 'Activo'
  };

  console.log('Empleado que se enviará:', empleado);

  this.auth.crearEmpleado(empleado).subscribe({

    next: (response) => {
              this.toast.success('Empleado creado correctamente');

      this.closeModal();

      this.form.reset();

      this.step = 1;
      
      this.CargarEmpleados();

     setTimeout(() => {
  window.location.reload();
}, 2000);
    },

    error: (err) => {
        this.toast.error('No se pudo crear el empleado');

      console.error('Error creando empleado:', err);

      alert('No se ha podido crear el empleado.');
    }

  });
} 

@HostListener('document:click', ['$event'])
handleClickOutside(event: Event) {
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.openId = null;
  }
}
toggleDropdown(id: number, event: Event) {
  event.stopPropagation(); 
  this.openId = this.openId === id ? null : id;
}

abrirModal(tipo: any, emp: any) {
  this.openDropdownId = tipo;
  this.empleadoSeleccionado = emp;
  console.log('Empleado seleccionado:', this.empleadoSeleccionado);
}

cerrarModal() {
  this.openDropdownId = null;
  this.empleadoSeleccionado = null;     
}

guardarCambios() {
  console.log('Guardando cambios para', this.empleadoSeleccionado);
  this.cerrarModal(); 
}

modificarEmpleado() {
  console.log('Modificando empleado', this.empleadoSeleccionado);
  this.cerrarModal();
}

eliminarEmpleado() {
  console.log('Eliminando empleado', this.empleadoSeleccionado);
  this.cerrarModal(); 
}

aprobarFichaje(f: any) {
  f.estado = 'aprobado';
}

rechazarFichaje(f: any) {
  f.estado = 'rechazado';
}


fichajeEmpleado (id:any){
   this.router.navigate(['../management-clock-in', id], {
    relativeTo: this.route
  });
}

subirNomina (id:any){
   this.router.navigate(['../management-paysheet', id], {
    relativeTo: this.route
  });
}

subirDocumentos (id:any){
   this.router.navigate(['../management-documents', id], {
    relativeTo: this.route
  });
}

solicitudesEmpleado (id:any){
   this.router.navigate(['../management-requests', id], {
    relativeTo: this.route
  });
}

confirmarCambioEstado(emp: EmpleadoData) {

  this.empleadoEstadoSeleccionado = emp;

  this.accionEstado = emp.active ? 'desactivar' : 'activar';

  this.mostrarConfirmacionEstado = true;
}

cancelarCambioEstado() {

  if (this.cambiandoEstado) return;

  this.mostrarConfirmacionEstado = false;
  this.empleadoEstadoSeleccionado = null;
  this.accionEstado = null;
}

cambiarEstadoEmpleado() {

  if (!this.empleadoEstadoSeleccionado || !this.accionEstado) {
    return;
  }

  const empleado = this.empleadoEstadoSeleccionado;

  this.cambiandoEstado = true;

  const peticion = this.accionEstado === 'desactivar'
    ? this.auth.desactivarEmpleado(empleado.idEmployee)
    : this.auth.activarEmpleado(empleado.idEmployee);

  peticion.subscribe({

    next: () => {

      empleado.active = this.accionEstado === 'activar';

      this.cambiandoEstado = false;

      this.mostrarConfirmacionEstado = false;
      this.empleadoEstadoSeleccionado = null;
      this.accionEstado = null;

    },

    error: (err) => {

      console.error('Error cambiando estado del empleado:', err);

      this.cambiandoEstado = false;

      alert('No se ha podido cambiar el estado del empleado.');
    }

  });
}



}
