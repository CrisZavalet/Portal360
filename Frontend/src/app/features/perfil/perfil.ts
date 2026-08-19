import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
   name_user : any;
  suername_user: any;
  rol_user: any;
  tel_user: any;
  email_user: any;
  area_user: any;
  puesto_user: any;
  fnac_user: any;
  iban_user: any;
  dia_incorporacion_user: any;
  vacaciones_user: any;
  ubicacion_user: any;
  antiguedad_user: any;
  meses_antiguedad_user: any;

  modalOpen = false;
  estado_user: any;
  modalOpenPhoto = false;
  photoPreview: string | ArrayBuffer | null = null;
photoName: string | null = null;
empleadoSelectado: any;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
 const id = localStorage.getItem('idEmployee');
console.log('ID del empleado:', id);
 this.datosEmpleado(id);
}

  datosEmpleado(id: any) {
    this.authService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.empleadoSelectado = data;

        console.log('Datos del empleado:', this.empleadoSelectado);
      },
      error: (err) => {
        console.error('STATUS:', err.status);
        console.error('ERROR BACKEND:', err.error);
      },
    });
  }

openModal() {
 if (!this.empleadoSelectado) return;

  this.name_user = this.empleadoSelectado.name;
  this.suername_user = this.empleadoSelectado.lastName;
  this.email_user = this.empleadoSelectado.email;
  this.tel_user = this.empleadoSelectado.phone;
  this.ubicacion_user = this.empleadoSelectado.location;
  this.iban_user = this.empleadoSelectado.iban;

  this.modalOpen = true;}

closeModal() {
  this.modalOpen = false;
}

getEstadoClase(estado: boolean): string {
  return estado === true
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';
}

guardarCambios() {
  const datosActualizados = {
    name: this.name_user,
    lastName: this.suername_user,
    email: this.email_user,
    phone: this.tel_user,
    location: this.ubicacion_user,
    iban: this.iban_user
  };

  console.log('Enviando:', datosActualizados);
  this.modalOpen = false;
}

openModalPhoto() {
  this.modalOpenPhoto = true;  
}

closeModalPhoto() {
  this.modalOpenPhoto = false;
}
// openModalPhotoEdit() {  
//   const modal = document.getElementById('photo_modal') as HTMLDialogElement;
//   modal.showModal();


onFileSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  this.photoName = file.name;

  const reader = new FileReader();

  reader.onload = () => {
    this.photoPreview = reader.result;
  };

  reader.readAsDataURL(file);
}
}
