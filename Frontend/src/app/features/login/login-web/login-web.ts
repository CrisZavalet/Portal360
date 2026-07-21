import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import{FormControl , FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-login-web',
  imports: [CommonModule, ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login-web.html',
  styleUrl: './login-web.css',
})
export class LoginWeb {
loginForm!: FormGroup;
showPassword = false;
showErrorModal = false;
showSuccessModal:boolean = false;
errorMessage = '';
successMessage = '';
constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {}

ngOnInit() {
  this.loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  }); 
}

Login() {
  console.warn(this.loginForm.value);

  if (!this.loginForm.valid) {
    console.log('Formulario inválido');
    this.loginForm.markAllAsTouched();
    this.openModalError(
      'El usuario o la contraseña son incorrectos.\nPor favor completa los datos correctamente.'
    );
    return;
  }

  const { username, password } = this.loginForm.value;

  this.authService.login(username!, password!).subscribe({
    next: (response) => {
      console.log('Login exitoso:', response);

      localStorage.setItem('user', username!);
      localStorage.setItem('role', response.role);
      localStorage.setItem('idEmployee', response.idEmployee.toString());


      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Error en el login:', error);

      this.openModalError(
        'El usuario o la contraseña son incorrectos.\nPor favor completa los datos correctamente.'
      );
    }
  });
}
  togglePassword() {
    this.showPassword = !this.showPassword;
  }



  openModalSuccess(message: string) {
    this.successMessage=message;
    this.showSuccessModal = true;

  }

  closeModalSuccess() {
    this.showSuccessModal = false;
    
  }

    openModalError(message: string) {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeModalError() {
    this.showErrorModal = false;

  }
}




