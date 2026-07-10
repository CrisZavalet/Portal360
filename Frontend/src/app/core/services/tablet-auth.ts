import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoFichaje } from '../interfaces/empleadoFichaje.interface';
import{Empleado} from '../interfaces/empleado.interface';
import { HistorialFichajeEmpleado } from '../interfaces/historialFichajeEmpleado.interface';
import { LoginTablet } from '../interfaces/loginTablet.interface';
@Injectable({
  providedIn: 'root',
})
export class TabletAuth {
  
private apiUrl = 'http://localhost:8080/api/kiosk/login'; 
private apiUrlFichaje = 'http://localhost:8080/api/clockings/today';
private apiUrlEmpleados = 'http://localhost:8080/api/employees';
private apiUrlEmpleadoFichajeHistorial = 'http://localhost:8080/api/clockings'
private http=inject(HttpClient);

login(email: string, password: string): Observable<LoginTablet> {

  const body = {
    email,
    password
  };

  localStorage.setItem('user', email);

  return this.http.post<LoginTablet>(this.apiUrl, body);
}

getEmpleadosFichaje(){
  return this.http.get<EmpleadoFichaje[]>(`${this.apiUrlFichaje}`);
}

getDatosEmpleados(){
  return this.http.get<Empleado[]>(`${this.apiUrlEmpleados}`);
}

 getHistorialEmpleado(idEmployee: any): Observable<HistorialFichajeEmpleado[]> {

    return this.http.get<HistorialFichajeEmpleado[]>(
      `${this.apiUrlEmpleadoFichajeHistorial}/employee/${idEmployee}/history`
    );

  }


}
 