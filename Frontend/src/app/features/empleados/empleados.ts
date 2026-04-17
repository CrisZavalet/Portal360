import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados {

  constructor(private fb: FormBuilder,private eRef: ElementRef) {}
searchTerm: string = '';
openModalEmpleado = false;
modalOpen = false;
step = 1;
form: any;
auth = inject(AuthService);
role = this.auth.getRole();
  open:any = false;
openId: number | null = null;
openDropdownId:  'editar' | 'fichajes' | 'nomina' | 'documentos' | 'mensaje'| null = null;
empleadoSeleccionado: any = null;
empleados = [
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
    email: 'florencia.sandoval@empresa.com',
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
  }
];

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
  estado: ['Activo'],

  usuario: [''],
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
});
}

empleadosFiltrados() {
  return this.empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.cargo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    emp.telefono.includes(this.searchTerm)
  );
}


getEstadoClase(estado: string): string {
  return estado === 'Activo'
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
  const nombre = this.form.value.nombre || '';
  const apellido = this.form.value.apellido || '';
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
}
