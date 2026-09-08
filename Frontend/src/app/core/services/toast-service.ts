import { Injectable, signal } from '@angular/core';
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
   toasts = signal<Toast[]>([]);

  private nextId = 0;

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const id = this.nextId++;

    this.toasts.update(toasts => [
      ...toasts,
      { id, message, type }
    ]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  remove(id: number) {
    this.toasts.update(toasts =>
      toasts.filter(toast => toast.id !== id)
    );
  }
}
