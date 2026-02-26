import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkTime {
    private storageKey = 'workData';
  workData = signal<Record<string, number>>(
    JSON.parse(localStorage.getItem(this.storageKey) || '{}')
  );

  addWorkSession(seconds: number) {
    const todayKey = new Date().toISOString().split('T')[0];

    const currentData = { ...this.workData() };

    if (!currentData[todayKey]) {
      currentData[todayKey] = 0;
    }

    currentData[todayKey] += seconds;

    this.workData.set(currentData);

    localStorage.setItem(this.storageKey, JSON.stringify(currentData));
  }
}
