import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import{FormControl , FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
signupForm!: FormGroup;
showPassword = false;
showConfirmPassword = false;
showErrorModal = false;
showSuccessModal:boolean = false;
errorMessage = '';
successMessage = '';

ngOnInit() {
  this.signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }); 
}

  signup(){
      console.warn(this.signupForm.value);
   if (this.signupForm.valid) {
    const {username, email, password, confirmPassword} = this.signupForm.value;  
    console.log('formulario válido');  
    } else {
      console.log('Formulario inválido');
       this.signupForm.markAllAsTouched();
      return;
    }
  }

    togglePassword() {
    this.showPassword = !this.showPassword;
  }


    toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
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
