import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
})
export class LayoutAdmin {
constructor( private router:Router) {}

logout() {
    this.router.navigate(['/access']);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }
  
}
