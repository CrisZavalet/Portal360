import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkTime {
    workData = signal<{[key:string]:number}>({});

  currentSession = signal(0);

  updateCurrentSession(seconds: number){
      this.currentSession.set(seconds);
  }

  addWorkSession(seconds:number){

      const todayKey = new Date().toISOString().split('T')[0];

      this.workData.update(data=>{

          return{
              ...data,
              [todayKey]:(data[todayKey] || 0)+seconds
          }

      });

      this.currentSession.set(0);
  }
}
