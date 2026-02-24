import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import{FormControl , FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms';
import { AuthService } from '../../../core/auth-service';

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
      if (this.loginForm.valid) {
        const {username, password} = this.loginForm.value;  
        const success = this.authService.login(username, password);
     if (success) {
    this.router.navigate(['/']);
  } else {
    this.openModalError('El usuario o la contraseña son incorrectos. \nPor favor completa los datos correctamente.');
  } 
    } else {
      console.log('Formulario inválido');
       this.loginForm.markAllAsTouched();
    this.openModalError('El usuario o la contraseña son incorrectos. \nPor favor completa los datos correctamente.');
      return;
    } 
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




