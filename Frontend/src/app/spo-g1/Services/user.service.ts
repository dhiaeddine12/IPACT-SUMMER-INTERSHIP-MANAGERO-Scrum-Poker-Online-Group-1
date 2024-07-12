import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../@core/data/users';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  Base: `http://localhost:8090/`;

  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8090/retrieve-all-users`);
  }

}
