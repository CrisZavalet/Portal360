import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth-service';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,MatMenuModule,MatButtonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
@Input() collapsed = false;
@Output() toggle = new EventEmitter<void>();
  constructor(private authService:AuthService, private router:Router){}


logout(){
this.authService.logout();
this.router.navigate(['/login'])
}
}
