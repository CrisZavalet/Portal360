import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoFichaje } from '../interfaces/empleadoFichaje.interface';

@Injectable({
  providedIn: 'root',
})
export class TabletAuth {
  
private apiUrl = 'http://localhost:8080/api/kiosk/login'; 
private apiUrlFichaje = 'http://localhost:8080/api/clockings/today';
private http=inject(HttpClient);

login(email: string, password: string): Observable<string> {

  const body = {
     email,
    password
  };

  localStorage.setItem('user', email);
  localStorage.setItem('role', 'RRHH');

  return this.http.post(this.apiUrl, body, {
    responseType: 'text'
  });

}

getEmpleados(){
  return this.http.get<EmpleadoFichaje[]>(`${this.apiUrlFichaje}`);
}


}
 