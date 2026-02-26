import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
sidebarCollapsed = false;
  mobileOpen = false;
  isMobile = false;

  constructor(private breakpoint: BreakpointObserver) {
    this.breakpoint.observe(['(max-width: 1024px)'])
      .subscribe(result => {
        this.isMobile = result.matches;

        if (this.isMobile) {
          this.mobileOpen = false;
        } else {
          this.mobileOpen = true;
        }
      });
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.mobileOpen = !this.mobileOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  closeMobile() {
    this.mobileOpen = false;
  }
}
