import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bandeja-entrada',
  imports: [CommonModule, FormsModule],
  templateUrl: './bandeja-entrada.html',
  styleUrl: './bandeja-entrada.css',
})
export class BandejaEntrada {
  mensajes = [
    {
      leido: true,
      asunto: 'Reunión de equipo',
      mensaje:
        'Recordatorio de la reunión de equipo mañana a las 10:00 AM. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proiden',
      fecha: new Date('2024-06-01T10:00:00'),
    },
    {
      leido: false,
      asunto: 'Actualización del proyecto',
      mensaje: 'Se ha actualizado el estado del proyecto en el sistema.',
      fecha: new Date('2024-06-02T14:30:00'),
    },
    {
      leido: false,
      asunto: 'Solicitud de vacaciones',
      mensaje: 'Se ha recibido una solicitud de vacaciones para el próximo mes.',
      fecha: new Date('2024-06-03T09:15:00'),
    },
    {
      leido: false,
      asunto: 'Informe mensual',
      mensaje: 'El informe mensual está disponible para su revisión.',
      fecha: new Date('2024-06-04T16:45:00'),
    },
    {
      leido: false,
      asunto: 'Cambio de horario',
      mensaje: 'Se ha realizado un cambio en el horario de trabajo para la próxima semana.',
      fecha: new Date('2024-06-05T11:20:00'),
    },
    {
      leido: false,
      asunto: 'Capacitación obligatoria',
      mensaje: 'Se requiere la asistencia a una capacitación obligatoria el próximo viernes.',
      fecha: new Date('2024-06-06T13:00:00'),
    },
    {
      leido: false,
      asunto: 'Actualización de políticas',
      mensaje: 'Se han actualizado las políticas de la empresa. Por favor, revíselas.',
      fecha: new Date('2024-06-07T15:30:00'),
    },
    {
      leido: false,
      asunto: 'Recordatorio de pago',
      mensaje: 'Este es un recordatorio de que el pago de su factura vence mañana.',
      fecha: new Date('2024-06-08T10:45:00'),
    },
    {
      leido: false,
      asunto: 'Evento de networking',
      mensaje: 'Se invita a todos los empleados a un evento de networking el próximo jueves.',
      fecha: new Date('2024-06-09T18:00:00'),
    },
    {
      leido: false,
      asunto: 'Actualización de software',
      mensaje: 'Se ha lanzado una nueva versión del software. Por favor, actualice su sistema.',
      fecha: new Date('2024-06-10T09:30:00'),
    },
  ];
  mensajesFiltrados = [...this.mensajes];
  busqueda = '';
  filtro: 'todos' | 'leidos' | 'noLeidos' = 'todos';
  abrirModal = false;
  crearMensajeModal = false;
  mensajeSeleccionado: {
    leido: boolean;
    asunto: string;
    mensaje: string;
    fecha: Date;
  } | null = null;
  nuevoMensaje: {
    asunto: string;
    mensaje: string;
  } = {
    asunto: '',
    mensaje: '',
  };

  paginaActual = 1;
mensajesPorPagina = 5;

  ngOnInit() {
    this.mensajesFiltrados = this.mensajes;
  }

  filtrarMensajes() {
     this.paginaActual = 1;

  const search = this.busqueda.toLowerCase().trim();

  this.mensajesFiltrados = this.mensajes.filter(m => {
    const coincideFiltro =
      this.filtro === 'todos' ||
      (this.filtro === 'leidos' && m.leido) ||
      (this.filtro === 'noLeidos' && !m.leido);

    const coincideBusqueda =
      m.asunto.toLowerCase().includes(search) ||
      m.mensaje.toLowerCase().includes(search) ||
      m.fecha.toLocaleString('es-ES').toLowerCase().includes(search);

    return coincideFiltro && coincideBusqueda;
  });
  }

  formatearFecha(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return fecha.toLocaleString('es-ES', opciones);
  }

  crearMensaje() {
    console.log('Función para crear un nuevo mensaje');
    this.crearMensajeModal = true;
    this.nuevoMensaje = { asunto: '', mensaje: '' };
  }

  abrirMensaje(mensaje: any) {
    console.log('Abriendo mensaje:', mensaje);
    mensaje.leido = true;

    this.mensajeSeleccionado = mensaje;

    this.abrirModal = true;
    this.filtrarMensajes();
  }

  cerrarModal() {
    this.abrirModal = false;
    this.mensajeSeleccionado = null;
  }

  cerrarMensajeModal() {
    console.log('Cerrando modal de mensaje');
    this.crearMensajeModal = false;
    this.mensajeSeleccionado = null;

  }

  get totalPaginas(): number {
  return Math.ceil(
    this.mensajesFiltrados.length / this.mensajesPorPagina
  );
}

get mensajesPaginados() {
  const inicio = (this.paginaActual - 1) * this.mensajesPorPagina;

  return this.mensajesFiltrados.slice(
    inicio,
    inicio + this.mensajesPorPagina
  );
}

cambiarPagina(pagina: number) {
  if (pagina >= 1 && pagina <= this.totalPaginas) {
    this.paginaActual = pagina;
  }
}

cambiarMensajesPorPagina(cantidad: number) {
  this.mensajesPorPagina = Number(cantidad);
  this.paginaActual = 1;
}


}
