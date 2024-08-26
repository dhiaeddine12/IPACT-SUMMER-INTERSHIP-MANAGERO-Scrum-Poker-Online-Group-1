import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class VotingService {
  constructor(private http: HttpClient) { }
  BasedUrl = `http://localhost:8081`;
  addVote(vote: any,id_session:any,id_issue:any,username:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.BasedUrl}/add_vote/${id_issue}/${id_session}/${username}`, vote);
  }

  getVoteStatistics(issueTitle: string,session_token:any ): Observable<any> {
    return this.http.get<any>(`${this.BasedUrl}/vote_statistics/${issueTitle}/${session_token}`);
    //return this.http.get<any>(`${this.BasedUrl}/vote_statistics/${session_token}`);
  }

  getAllVoteResults(session_token: string): Observable<any> {
    return this.http.get(`${this.BasedUrl}/${session_token}/all-issues/results`);
  }


}
