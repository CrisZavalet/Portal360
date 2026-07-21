import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginTablet } from '../interfaces/loginTablet.interface';
import { identity, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Empleado } from '../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/kiosk/onlylogin';
  private apiUrlFichaje = 'http://localhost:8080/api/kiosk/onlyfichaje';
  private apiUrlEmpleados = 'http://localhost:8080/api/employees'; 
private http=inject(HttpClient);

 
  
login(email: string, password: string): Observable<LoginTablet> {

    const body = {
      email,
      password
    };

    return this.http.post<LoginTablet>(this.apiUrl, body).pipe(
      tap((response) => {
      
        console.log('Login exitoso:', response);
        localStorage.setItem('user', email);
        localStorage.setItem('role', response.role);
        localStorage.setItem('idEmployee', response.idEmployee.toString());
      })
    );
  }

  fichaje(idEmployee: number): Observable<LoginTablet> {

    const body = {
      idEmployee,
    };

    return this.http.post<LoginTablet>(this.apiUrlFichaje, body).pipe(
      tap((response) => {
      
        console.log('Fichaje exitoso:', response);
        localStorage.setItem('role', response.role);
        localStorage.setItem('idEmployee', response.idEmployee.toString());
      })
    );
  }


  logout() {
    localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  }

  getAllEmployees(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrlEmpleados}/all`);
  }

  getEmployeeById(idEmployee: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrlEmpleados}/${idEmployee}`);
  }


  getUser() {
    console.log('Obteniendo usuario desde localStorage:', localStorage.getItem('user'));
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


