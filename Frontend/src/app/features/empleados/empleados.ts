import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Fichaje } from "../fichaje/fichaje";
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoData } from '../../core/interfaces/empleadoData.interface';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados {

  constructor(private fb: FormBuilder,  private route: ActivatedRoute
, private eRef: ElementRef, private router: Router) {}
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
empleados:any



ngOnInit() {
this.form = this.fb.group({
  // Personal
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  direccion: [''],
  email: ['', [Validators.required, Validators.email]],
  telefono: [''],
  nacimiento: [''],
  ubicacion: [''],
  iban: [''],

  departamento: [''],
  puesto: [''],
  fechaInicio: [''],
  estado: ['', Validators.required],

  usuario: [''],
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
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
  this.openModalEmpleado = false;
}


nextStep() {
 
  this.form.markAllAsTouched();
if (this.step === 1 && this.form.get('nombre')?.invalid) return;
  if (this.step === 1 && this.form.get('apellido')?.invalid) return;
  if (this.step === 1 && this.form.get('email')?.invalid) return;
    // if (this.form.invalid) return;
  if (this.step === 2) {
    this.generarUsuario();
  }

  this.step++;
}

prevStep() {
  this.step--;
}

generarUsuario() {
  const nombre = this.form.value.name || '';
  const apellido = this.form.value.lastName || '';
const apellidos = apellido.split(' ');
const user = (nombre.charAt(0) + apellidos[0] + (apellidos[1]?.charAt(0) || '')).toLowerCase();

  this.form.patchValue({ usuario: user });

  this.generarPassword();
}

generarPassword() {
  const random = Math.random().toString(36).slice(-8);
  this.form.patchValue({ password: random, confirmPassword: random });
}

crearEmpleado() {
  if (this.form.invalid) return;

  console.log(this.form.value);
  this.modalOpen = false;
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
   this.router.navigate(['../paysheet', id], {
    relativeTo: this.route
  });
}

subirDocumentos (id:any){
   this.router.navigate(['../clock-in', id], {
    relativeTo: this.route
  });
}


enviarMensaje (){
   
     
}
}
