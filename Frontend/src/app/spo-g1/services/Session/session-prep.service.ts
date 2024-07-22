import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionPreperationService {
  BasedUrl = `http://localhost:8081`;
  constructor(private http: HttpClient) { }

  addSession(session: any): Observable<any> {
    return this.http.post<any>(`${this.BasedUrl}/add_Session/`, session);
  }

  inviteUser(id_user: string, id_session: string): Observable<any> {
    const url = `${this.BasedUrl}/${id_user}/${id_session}`;
    return this.http.post<any>(`${this.BasedUrl}/invite/${id_user}/${id_session}`, {});
  }

}
