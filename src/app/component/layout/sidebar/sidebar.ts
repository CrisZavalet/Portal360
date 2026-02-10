import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  toggleSidebar() {
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
    }
  } 
}
