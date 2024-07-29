import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionPreperationService {
  BasedUrl = `http://localhost:8081`;
  private session: any = null;

  constructor(private http: HttpClient) { }

  setSession(session: any) {
    this.session = session;
  }

  getSession() {
    return this.session;
  }
  addSession(session: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.BasedUrl}/add_Session`, session,{ headers });
  }

  inviteUser(id_user: string, id_session: string): Observable<any> {
    const url = `${this.BasedUrl}/${id_user}/${id_session}`;
    return this.http.post<any>(`${this.BasedUrl}/invite/${id_user}/${id_session}`, {});
  }

  ajouter_issue(id_issue: string, id_session: string): Observable<any> {
    const url = `${this.BasedUrl}/${id_issue}/${id_session}`;
    return this.http.post<any>(`${this.BasedUrl}/ajouter_issues/${id_issue}/${id_session}`, {});
  }
 // BasedUrl = `http://localhost:8081`;
 /* createSessionAndSendEmail(email: string, session: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.BasedUrl}/mail/${email}`, session,{ headers });
  }*/
  createSessionAndSendEmail(email: string, session: any): Observable<any> {
    return this.http.post(`${this.BasedUrl}/mail?email=${email}`, session);
  }

  getIssues_By_Session(token: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BasedUrl}/room/${token}`);
  }


}
