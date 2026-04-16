import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private testUser = {
    id: 1,
    name: 'Florencia Macarena ',
    surname: 'Sandoval Perez',
    username:'fsandovalp',
    email: 'florencia@portal360.com',
    password: '123456',
    role: 'RRHH',
    fnac:'1994-10-15',
    iban:'ES7620770024003102575766',
    area: 'IT',
    puesto: 'Diseñadora UX/UI',
    telefono: '555-1234',
    dia_incorporacion: '2024-02-03',
    vacaciones: 22,
    ubicacion: 'Madrid',
    estado: 'Activo'
    
  }
 
  
 login(username: string, password: string): boolean {
    if (
      username === this.testUser.username &&
      password === this.testUser.password
    ) {
      const { password: _, ...userWithoutPassword } = this.testUser;

      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('user');
  }


  getRole(): string | null {
    return localStorage.getItem('role');
  }

   isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(roles: string[]): boolean {
    const userRole = this.getRole();
    return roles.includes(userRole || '');
  }
}


