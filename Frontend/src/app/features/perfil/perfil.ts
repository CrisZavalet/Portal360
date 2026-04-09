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

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    const user = this.authService.getUser();
    this.name_user = user?.name;
    this.suername_user = user?.surname;
    this.rol_user = user?.role;
    this.tel_user = user?.telefono;
    this.email_user = user?.email;
    this.area_user = user?.area;
    this.puesto_user = user?.puesto;
    this.fnac_user = user?.fnac;
    this.iban_user = user?.iban;
    this.dia_incorporacion_user = user?.dia_incorporacion;
    this.vacaciones_user = user?.vacaciones;
    this.ubicacion_user = user?.ubicacion;
    this.estado_user = user?.estado;

    const today = new Date();
    const diaIncorporacion = new Date(this.dia_incorporacion_user);
    const antiguedad = today.getFullYear() - diaIncorporacion.getFullYear();
 if(antiguedad <= 0) {
    const mesesAntiguedad = (today.getMonth() - diaIncorporacion.getMonth() + 12) % 12;
    if(mesesAntiguedad === 1) {
    this.antiguedad_user = mesesAntiguedad + ' mes';
  } else {
    this.antiguedad_user = mesesAntiguedad + ' meses';
  }
  }else{
    if(antiguedad === 1) {
    this.antiguedad_user = antiguedad + ' año';
  } else {
    this.antiguedad_user = antiguedad + ' años';
  }
  }
}

openModal() {
  this.modalOpen = true;  
}

closeModal() {
  this.modalOpen = false;
}

getEstadoClase(estado: string): string {
  return estado === 'Activo'
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';
}

guardarCambios() {
  console.log('Datos actualizados:', this.name_user);
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
