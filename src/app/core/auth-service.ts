import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private MOCK_USER = {
    id: 1,
    name: 'Florencia Macarena Sandoval',
    username:'FlorSan',
    email: 'florencia@portal360.com',
    password: '123456',
    role: 'empleado',
    vacaciones: 22
  };
 login(username: string, password: string): boolean {
    if (
      username === this.MOCK_USER.username &&
      password === this.MOCK_USER.password
    ) {
      const { password: _, ...userWithoutPassword } = this.MOCK_USER;

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


