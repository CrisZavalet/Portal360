import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './features/access/login/login';
import { Toast } from "./shared/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portal360');
}
