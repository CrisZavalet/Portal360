import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    private router = inject(Router);
    private authService = inject(AuthService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const requiredRole = route.data?.['roles'].find((role: string) => role === localStorage.getItem('role'))    ;
        const userRole = localStorage.getItem('role');

  const isAuthenticated = this.authService.getToken() !== null;
    
  if (!isAuthenticated) {
    this.router.navigate(['/login']);
     return false;
  }

        if (userRole === requiredRole) {
            return true;
        }

        

        this.router.navigate(['/unauthorized']);
        return false;
    }
}