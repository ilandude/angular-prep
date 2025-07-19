import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);
  private apiUrl = environment.countriesApiUrl;
  private params = new HttpParams().set('fields', 'name');

  getCountries(): Observable<string[]> {

    return this.http.get<any[]>(this.apiUrl, { params: this.params}).pipe(
       tap(() => console.log('HTTP call fired')),
      map(countries =>
        countries.map(c => c.name.common).sort()
      )
    );
  }

  searchCountries(term: string): Observable<string[]> {
    return this.getCountries().pipe(
      map(countries =>
        countries.filter(c =>
          c.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}