import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth-service';
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
@Input() mobileOpen = false;
@Output() closeMobile = new EventEmitter<void>();
open:any = false;
  constructor(private authService:AuthService, private router:Router){}


logout(){
this.authService.logout();
this.router.navigate(['/login'])
}

sidebarOpen = false;


perfile(){
  this.router.navigate(['/profile'])
}




 }


