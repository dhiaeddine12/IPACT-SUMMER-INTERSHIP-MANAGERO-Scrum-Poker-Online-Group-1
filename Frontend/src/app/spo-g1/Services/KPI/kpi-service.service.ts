import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private apiUrl = `http://localhost:8081/kpis`;
  BaseUrl=`http://localhost:8081`

  constructor(private http: HttpClient) { }

  getKpiData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  getTopThreeIssuesByAverageVote(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/top-three-by-average-vote`);
  }

  Pourcentage_avancement_projet(id:number){
    return this.http.get(`${this.BaseUrl}/Pourcentage/${id}`)
  }

}
