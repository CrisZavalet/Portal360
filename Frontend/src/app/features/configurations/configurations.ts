import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-configurations',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './configurations.html',
  styleUrl: './configurations.css',
})
export class Configurations {

currentPassword: string = '';
newPassword: string = '';
confirmPassword: string = '';
passwordError: string = '';

constructor(private authService: AuthService, private toast: ToastService) {}

actualizarPassword() {


  this.passwordError = '';

  // Comprobar que están rellenados
  if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
    this.passwordError = 'Debes rellenar todos los campos.';
    return;
  }

  // Comprobar que las contraseñas nuevas coinciden
  if (this.newPassword !== this.confirmPassword) {
    this.passwordError = 'Las nuevas contraseñas no coinciden.';
    return;
  }

  // Aquí tienes que obtener el ID del empleado
  const idEmployee = localStorage.getItem('idEmployee');

  this.authService.cambiarPassword(
    idEmployee,
    this.confirmPassword,
    this.newPassword,
    this.currentPassword
  ).subscribe({
    next: (response) => {

      console.log('Contraseña actualizada', response);

      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';

      this.toast.success('Contraseña actualizada correctamente');

    },
    error: (error) => {
      this.toast.error('No se pudo actualizar la contraseña');
      console.error('Error al cambiar contraseña:', error);

      this.passwordError =
        error.error?.message ||
        error.error?.error ||
        'No se ha podido actualizar la contraseña.';

    }
  });
}

}
