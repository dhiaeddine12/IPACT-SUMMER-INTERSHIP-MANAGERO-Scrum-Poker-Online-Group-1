import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { How } from '../models/How';

@Injectable({
  providedIn: 'root'
})
export class HowService {
  private baseUrl = 'http://localhost:8081/api/how'; 
  constructor(private http: HttpClient) { }

  getAllHows(): Observable<How[]> {
    return this.http.get<How[]>(this.baseUrl);
  }
}
