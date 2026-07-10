import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms';
import{ CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TabletAuth } from '../../../core/services/tablet-auth';
import { Router } from '@angular/router';
import { LoginTablet } from '../../../core/interfaces/loginTablet.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,FormsModule,MatButtonToggleModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
name!: string;
showPassword = false;
loginForm!: FormGroup;
showErrorModal = false;
showSuccessModal:boolean = false;
errorMessage = '';
successMessage = '';
currentTime: string= '';
isSubmitted = false;
active: 'Entrada' | 'Salida' = 'Entrada';
private clockInterval!: number;
role!:LoginTablet;
constructor(private fb: FormBuilder, private TabletAuth: TabletAuth, private router: Router) {}

ngOnInit() {
  const savedMovement = localStorage.getItem('fichaje');
  this.initClock();

  this.loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
      fichaje: new FormControl(savedMovement, Validators.required),
      dia: new FormControl(''),
      hora: new FormControl('')
  });



}

  setActive(value: 'Entrada' | 'Salida') {
    this.active = value;
  }
public get email() {
        return this.loginForm.get('email');
    }
    public get password() {
        return this.loginForm.get('password');
    }

Login() {

  if (this.loginForm.invalid) {
    return;
  }
const { time } = this.getCurrentDateTime();

  const { email, password } = this.loginForm.value;

  console.log('Llamando al login...', email);

  this.TabletAuth.login(email, password).subscribe({
    next: (res) => {
      console.log('Respuesta:', res);
       console.log(res.role); 
      localStorage.setItem('role', res.role);

      if(localStorage.getItem('role')==='RRHH'){
this.router.navigate(['/admin/view-time']);
return; 
      }
     this.openModalSuccess(
      `${res.message}\n\nHora del fichaje: ${time}`
    );

          this.loginForm.reset({
      fichaje: localStorage.getItem('fichaje')
    });
    },
    error: (err) => {
      console.error('Error:', err);
          this.openModalError('Usuario o contraseña incorrectos.');

    }
  });

}

  getCurrentDateTime(): { date: any; time: any; } {
     const now = new Date();

  return {
    date: now.toLocaleDateString('es-ES'),
    time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
  };
  }

initClock() {
  this.updateClock();

  this.clockInterval = window.setInterval(() => {
    this.updateClock();
  }, 1000);
}

updateClock() {
  const now = new Date();

  this.currentTime = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

}

onMovementChange(value: 'entrada' | 'salida') {
  localStorage.setItem('fichaje', value);
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
