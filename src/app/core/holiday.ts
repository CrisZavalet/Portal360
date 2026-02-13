import { Injectable, inject  } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Holiday {
  private http = inject(HttpClient);
  getHolidays(year: number) {
    return this.http.get(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=ES&subdivisionCode=ES-MD&validFrom=${year}-01-01&validTo=${year}-12-31`);
  }
}
