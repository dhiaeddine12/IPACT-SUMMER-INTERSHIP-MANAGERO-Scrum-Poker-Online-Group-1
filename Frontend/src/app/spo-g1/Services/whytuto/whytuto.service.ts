import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WhyTuto {
  id?: number
  whyTitle: string;
  whyDescription: string;
}
@Injectable({
  providedIn: 'root'
})
export class WhytutoService {

  apiUrl = `http://localhost:8081/whytuto`; 
  constructor(private http: HttpClient) { }


  getWhytuto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-whytutos`);
  }

  createWhytuto(whytuto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_whytuto`, whytuto);
  }


  updateWhytuto( whytuto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-whytuto`, whytuto);
  }

  
  deleteWhytuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-whytuto/${id}`);
  }
}
