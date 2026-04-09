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
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './models/role.enum';
export const routes: Routes = [
   { path: 'access', component: Login },
  { path: 'login', component: LoginWeb },
  { path: 'signup', component: Signup },
  { path: 'forgot-password', component: ForgotPassword },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] }  },
      { path: 'my-time', component: Fichaje, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'paysheet', component: Nomina, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'documents', component: Documento, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'absences', component: Ausencia, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'benefits', component: Beneficio, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'employees', component: Empleados, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'notifications', component: Notificaciones, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'profile', component: Perfil, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },
      { path: 'config', component: Configurations, canActivate: [RoleGuard],data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } },

      
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', component: NotFound, canActivate: [RoleGuard] ,data: { roles: [Role.EMPLEADO, Role.ADMIN, Role.RRHH] } }
];