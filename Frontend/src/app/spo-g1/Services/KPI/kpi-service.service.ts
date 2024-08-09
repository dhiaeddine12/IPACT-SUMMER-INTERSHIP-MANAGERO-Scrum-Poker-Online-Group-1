import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private apiUrl = `http://localhost:8081/kpis`;

  constructor(private http: HttpClient) { }

  getKpiData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
