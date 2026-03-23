import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private testUser = {
    id: 1,
    name: 'Florencia Macarena ',
    surname: 'Sandoval Perez',
    username:'FlorSan',
    email: 'florencia@portal360.com',
    password: '123456',
    role: 'Empleado',
    vacaciones: 22
  }

  ;
  
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
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('user');
  }
}


