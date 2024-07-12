import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Issue} from "../../models/issues";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private apiUrl = 'http://localhost:8081/api/issues';
  private apiUrl2 = 'http://localhost:8081/api/projects';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }
  deleteIssueFromProject(projectId: string, issueId: string) {
    return this.http.delete(`${this.apiUrl2}/${projectId}/${issueId}`);
  }
  getIssueById(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(id: string, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
  }

  deleteIssue(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getIssuesByProjectId(projectId: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl2}/${projectId}/issues`);
  }
}
