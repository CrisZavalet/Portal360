import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bandeja-entrada',
  imports: [CommonModule,FormsModule,],
  templateUrl: './bandeja-entrada.html',
  styleUrl: './bandeja-entrada.css',
})
export class BandejaEntrada {
mensajes = [];
mensajesFiltrados = [];
busqueda = '';

ngOnInit() {
  this.mensajesFiltrados = this.mensajes;
}

filtrarMensajes() {
  const search = this.busqueda.toLowerCase();

  // this.mensajesFiltrados = this.mensajes.filter(m =>
  //   m.asunto?.toLowerCase().includes(search) ||
  //   m.mensaje?.toLowerCase().includes(search) ||
  //   m.fecha?.toLocaleString('es-ES').toLowerCase().includes(search)
  // );
}


}
