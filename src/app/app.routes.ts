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
import { Configurations } from './features/configurations/configurations';
import { authUserGuard } from './core/guards/auth-user-guard';

export const routes: Routes = [
   { path: 'access', component: Login },
  { path: 'login', component: LoginWeb },
  { path: 'signup', component: Signup },
  { path: 'forgot-password', component: ForgotPassword },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [authUserGuard] },
      { path: 'my-time', component: Fichaje, canActivate: [authUserGuard] },
      { path: 'paysheet', component: Nomina, canActivate: [authUserGuard] },
      { path: 'documents', component: Documento, canActivate: [authUserGuard] },
      { path: 'absences', component: Ausencia, canActivate: [authUserGuard] },
      { path: 'benefits', component: Beneficio, canActivate: [authUserGuard] },
      { path: 'employees', component: Empleados, canActivate: [authUserGuard] },
      { path: 'notifications', component: Notificaciones, canActivate: [authUserGuard] },
      { path: 'profile', component: Perfil, canActivate: [authUserGuard] },
      { path: 'config', component: Configurations, canActivate: [authUserGuard] },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', component: NotFound }
];