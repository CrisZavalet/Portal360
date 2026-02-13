import { Routes } from '@angular/router';
import { Login } from './features/access/login/login';
import { LoginWeb } from './features/login/login-web/login-web';
import { Signup } from './features/login/signup/signup';
import { ForgotPassword } from './features/login/forgot-password/forgot-password';
import { Layout } from './layout/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
    {path: 'access', component:Login },
    {path: 'login', component:LoginWeb },
    {path: 'signup', component: Signup },
    {path:'forgot-password', component: ForgotPassword },
    {path: '**', redirectTo: 'dashboard' },
    {path: '', component: Layout, children: [
      {path: 'dashboard', component: Dashboard}
    ]}
];