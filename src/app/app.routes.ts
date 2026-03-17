import { Routes } from '@angular/router';
import { Login } from './features/access/login/login';
import { LoginWeb } from './features/login/login-web/login-web';
import { Signup } from './features/login/signup/signup';
import { ForgotPassword } from './features/login/forgot-password/forgot-password';
import { Layout } from './layout/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Fichaje } from './features/fichaje/fichaje';
import { Nomina } from './features/nomina/nomina';
import { Documento } from './features/documento/documento';
import { Ausencia } from './features/ausencia/ausencia';
import { Beneficio } from './features/beneficio/beneficio';
import { Empleados } from './features/empleados/empleados';
import { Notificaciones } from './features/notificaciones/notificaciones';
import { Perfil } from './features/perfil/perfil';
import { NotFound } from './shared/not-found/not-found';

export const routes: Routes = [
   { path: 'access', component: Login },
  { path: 'login', component: LoginWeb },
  { path: 'signup', component: Signup },
  { path: 'forgot-password', component: ForgotPassword },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'my-time', component: Fichaje },
      { path: 'paysheet', component: Nomina },
      { path: 'documents', component: Documento },
      { path: 'absences', component: Ausencia },
      { path: 'benefits', component: Beneficio },
      { path: 'employees', component: Empleados },
      { path: 'notifications', component: Notificaciones },
      { path: 'profile', component: Perfil },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', component: NotFound }
];