import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms';
import{ CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
showPassword = false;
loginForm!: FormGroup;
showErrorModal = false;
showSuccessModal = false;
errorMessage = '';
successMessage = '';
  isSubmitted = false;

constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  
}

public get username() {
        return this.loginForm.get('username');
    }
    public get password() {
        return this.loginForm.get('password');
    }

Login() {
      this.isSubmitted = true;
  if (this.loginForm.valid) {
    const {username, password} = this.loginForm.value;
    console.log('Username:', username);
    console.log('Password:', password);

    this.openModalSuccess('Haz inciado tu jornada exitosamente. \n¡Bienvenido/a ' + this.username + '!');

} else {
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
