import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-empleado',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil-empleado.html',
  styleUrl: './perfil-empleado.css',
})
export class PerfilEmpleado {
  id: any;
  empleadoSelectado: any;
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
modalOpenMensaje = false;
  constructor(private route: ActivatedRoute, private authService: AuthService) {}
    ngOnInit() {

      this.id = this.route.snapshot.params['id'];
      this.datosEmpleado(this.id);
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


modelCloseModalMensaje() {
  this.modalOpenMensaje = false;
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

volver(){
  window.history.back();
}

enviarMensaje (){
   
     
}

modelopenModalMensaje() {
  this.modalOpenMensaje = true;
}


}
