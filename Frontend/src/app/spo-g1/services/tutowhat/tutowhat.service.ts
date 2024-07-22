import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TutoWhat {
  id: string;
  
  whatDescription: string;
}
@Injectable({
  providedIn: 'root'
})
export class TutowhatService {

  apiUrl = `http://localhost:8081/whattuto`; 
  constructor(private http: HttpClient) { }

  getAllTutoWhats(): Observable<TutoWhat[]> {
    return this.http.get<TutoWhat[]>(`${this.apiUrl}/retrieve-all-whattutos`);

  }

  updateTutoWhat( whattuto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-whattuto`, whattuto);
  }
  
}
