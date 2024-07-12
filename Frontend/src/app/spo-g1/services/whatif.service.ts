import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Whatif } from '../models/Whatif';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatifService {
  private baseUrl = 'http://localhost:8081/api/whatif'; // Adjust the URL if necessary

  constructor(private http: HttpClient) { }

  getAllWhatifs(): Observable<Whatif[]> {
    return this.http.get<Whatif[]>(this.baseUrl);
  }
}