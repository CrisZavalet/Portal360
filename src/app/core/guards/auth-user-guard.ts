import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authUserGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);

  const token = localStorage.getItem('user');
    const role = localStorage.getItem('role');


  if (!token) {
    
    router.navigate(['/login']);
    return false;
  }else{
  return true;}
};
