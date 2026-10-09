import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnDestroy {

  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  @Input() mobileOpen = false;
  @Output() closeMobile = new EventEmitter<void>();

  name_user: any;
  suername_user: any;
  rol_user: any;

  open: any = false;
  idEmployee: any;
  user: any;
  role: any;

  private pendientesInterval: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.idEmployee = localStorage.getItem('idEmployee');
    this.user = localStorage.getItem('user');
    this.role = localStorage.getItem('role');

    console.log(
      'Usuario obtenido desde el servicio AuthService:',
      this.user
    );

    if (this.user) {

      this.authService
        .getEmployeeById(parseInt(this.idEmployee))
        .subscribe((employee: any) => {

          this.name_user = employee.name;
          this.suername_user = employee.lastName;
          this.rol_user = employee.role;

        });

    } else {

      console.log(
        'No se encontró información del usuario en el localStorage.'
      );

    }

    // Solo RRHH necesita el contador
    if (this.role === 'RRHH') {

      // Primera consulta
      this.authService.actualizarPendientes();

      // Comprobar nuevas solicitudes cada 30 segundos
      this.pendientesInterval = setInterval(() => {

        this.authService.actualizarPendientes();

      }, 30000);

    }

  }


  ngOnDestroy(): void {

    if (this.pendientesInterval) {
      clearInterval(this.pendientesInterval);
    }

  }


  logout() {

    this.authService.logout();

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }


  sidebarOpen = false;


  perfile() {

    this.router.navigate(['/profile']);

  }


  config() {

    this.router.navigate(['/config']);

  }

}