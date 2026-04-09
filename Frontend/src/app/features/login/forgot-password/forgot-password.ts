import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import{FormControl , FormGroup, Validators, ReactiveFormsModule,FormBuilder,FormsModule} from '@angular/forms'; 

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
forgotPassForm!: FormGroup;
showPassword = false;
showConfirmPassword = false;
showErrorModal = false;
showSuccessModal:boolean = false;
errorMessage = '';
successMessage = '';

ngOnInit() {
  this.forgotPassForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  }); 
}

forgotPassword() {
      console.warn(this.forgotPassForm.value);
   if (this.forgotPassForm.valid) {
    const {email} = this.forgotPassForm.value;  
    console.log('formulario válido');  
    } else {
      console.log('Formulario inválido');
       this.forgotPassForm.markAllAsTouched();
      return;
    }
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
