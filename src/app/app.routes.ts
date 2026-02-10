import { Routes } from '@angular/router';
import { Login } from './access/login/login';
import { LoginWeb } from './login/login-web/login-web';
import { Signup } from './login/signup/signup';
import { ForgotPassword } from './login/forgot-password/forgot-password';
import { Home } from './component/home/home';
import { Layout } from './component/layout/layout';

export const routes: Routes = [
    {path: 'access', component:Login },
    {path: 'login', component:LoginWeb },
    {path: 'signup', component: Signup },
    {path:'forgot-password', component: ForgotPassword },
    {path:'home',component: Home},
    {path: '', component: Layout}
];