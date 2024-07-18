import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Forum {
  id?: number;
  user: string;
  content: string;
  date: string;
}
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  apiUrl = `http://localhost:8081/forum`; 
  constructor(private http: HttpClient) { }
  getForum(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-forums`);
  }

   
   getForumById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/retrieve-forum/${id}`);
  }


  createForum(forum: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_forum`, forum);
  }


  updateForum( forum: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-forum`, forum);
  }

  
  deleteForum(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-forum/${id}`);
  }


  getMessages(senderId: string, receiverId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/retrieve/${senderId}/${receiverId}`);
  }

  
}
