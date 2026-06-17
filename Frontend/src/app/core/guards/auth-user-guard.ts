import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authUserGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);

  const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    console.log('User:', user);
    console.log('Role:', role);

   if (user && role === 'Empleado'|| role === 'Administrador'|| role === 'RRHH') {
    return true;
  }else {
    router.navigate(['/login']);
  return false;
  }

  
};
