import { Routes } from '@angular/router';
import { Login } from './login/login';
import { LoginWeb } from './login-web/login-web';
import { Signup } from './signup/signup';
import { ForgotPassword } from './forgot-password/forgot-password';

export const routes: Routes = [
    {path: 'access', component:Login },
    {path: 'login', component:LoginWeb },
    {path: 'signup', component: Signup },
    {path:'forgot-password', component: ForgotPassword },
];