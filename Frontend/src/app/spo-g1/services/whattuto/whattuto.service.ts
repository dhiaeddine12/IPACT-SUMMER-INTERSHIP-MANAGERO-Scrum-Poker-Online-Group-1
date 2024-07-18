import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WhatTuto {
  id?: number
 whatDescription: string;
}
@Injectable({
  providedIn: 'root'
})
export class WhattutoService {

  apiUrl = `http://localhost:8081/whattuto`; 
  constructor(private http: HttpClient) { }


  getWhattuto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-whattutos`);
  }

  createWhattuto(whattuto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_whattuto`, whattuto);
  }


  updateWhattuto( whattuto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-whattuto`, whattuto);
  }

  
  deleteWhattuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-whattuto/${id}`);
  }
}
