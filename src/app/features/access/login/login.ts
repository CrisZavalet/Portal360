import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms';
import{ CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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

constructor(private fb: FormBuilder) {}

ngOnInit() {
  const savedMovement = localStorage.getItem('fichaje');
  this.initClock();

  this.loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    fichaje: new FormControl(savedMovement, Validators.required),
    dia: new FormControl(''),
    hora: new FormControl('')
  });



}

  setActive(value: 'Entrada' | 'Salida') {
    this.active = value;
  }
public get username() {
        return this.loginForm.get('username');
    }
    public get password() {
        return this.loginForm.get('password');
    }

Login() {
      console.warn(this.loginForm.value);

   const {date, time} = this.getCurrentDateTime();
  console.log('Date:', date);
  console.log('Time:', time);
  if (this.loginForm.valid) {
    const {username, password,fichaje} = this.loginForm.value;
    console.log('Username:', username);
    console.log('Password:', password);

    this.loginForm.get('dia')?.setValue(date);
    this.loginForm.get('hora')?.setValue(time);
    // console.log('Fichaje:', this.loginForm.get('fichaje')?.value);
    console.log(this.loginForm.value);
    this.openModalSuccess('Haz inciado tu jornada exitosamente. \n¡Bienvenido/a ' + this.username?.value + '!');

} else {
    this.loginForm.markAllAsTouched();
    this.openModalError('El usuario o la contraseña son incorrectos. \nPor favor completa los datos correctamente.');
      return;
  }
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
