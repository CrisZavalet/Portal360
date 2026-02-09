import { Routes } from '@angular/router';
import { Login } from './login/login';
import { LoginWeb } from './login-web/login-web';
import { Signup } from './signup/signup';

export const routes: Routes = [
    {path: 'access', component:Login },
    {path: 'login', component:LoginWeb },
    {path: 'signup', component: Signup },
];