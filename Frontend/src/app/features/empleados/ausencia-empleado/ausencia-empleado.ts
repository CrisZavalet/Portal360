import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-ausencia-empleado',
  imports: [],
  templateUrl: './ausencia-empleado.html',
  styleUrl: './ausencia-empleado.css',
})
export class AusenciaEmpleado {
id: any;
empleadoSelectado: any;
solicitud:any;
  constructor(private route: ActivatedRoute, private authService: AuthService) {}
    ngOnInit() {

      this.id = this.route.snapshot.params['id'];
      this.datosEmpleado(this.id);
      this.solicitudesAusencias(this.id);
    }

    datosEmpleado(id: any) {
      this.authService.getEmployeeById(id).subscribe({
        next: (data) => {
          this.empleadoSelectado = data;

          console.log('Datos del empleado:', this.empleadoSelectado);
        }
,        error: (err) => {
          console.error('STATUS:', err.status);
          console.error('ERROR BACKEND:', err.error);
        },
      });
    }

    solicitudesAusencias(id: any) {
      this.authService.getSolicitudById(id).subscribe({
        next: (data) => {
          this.solicitud = data;
          console.log('Solicitudes de ausencias:', this.solicitud);
        },
        error: (err) => {
          console.error('STATUS:', err.status);
          console.error('ERROR BACKEND:', err.error);
        },
      });
    }

}
