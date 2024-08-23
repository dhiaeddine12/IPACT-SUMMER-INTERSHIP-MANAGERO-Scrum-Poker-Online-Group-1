import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreategameService {

  apiUrl = `http://localhost:8081/creategame`; 
  constructor(private http: HttpClient) { }
  getCreateGame(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-creategames`);
  }

   
   getCreateGameById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/retrieve-creategame/${id}`);
  }


  createCreateGame(creategame: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_creategame`, creategame);
  }


  updateCreateGame( creategame: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-creategame`, creategame);
  }

  
  deleteCreateGame(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-creategame/${id}`);
  }
}
