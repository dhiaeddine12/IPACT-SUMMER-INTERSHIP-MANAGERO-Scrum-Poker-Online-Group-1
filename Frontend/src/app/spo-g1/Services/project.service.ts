import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/api/projects'; // Update URL as needed

  constructor(private http: HttpClient) {}

  getStatusCounts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status-counts`);
  }
}