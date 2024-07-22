import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface TutoWhy {
  id: string;
  
  whyTitle: string;
  whyDescription: string;
}
@Injectable({
  providedIn: 'root'
})
export class TutowhyService {


  apiUrl = `http://localhost:8081/whytuto`; 
  constructor(private http: HttpClient) { }

  getAllTutoWhys(): Observable<TutoWhy[]> {
    return this.http.get<TutoWhy[]>(`${this.apiUrl}/retrieve-all-whytutos`);

  }

  updateTutoWhy( whytuto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-whytuto`, whytuto)
    
    
  }
  addTutoWhy(whytuto: TutoWhy): Observable<TutoWhy> {
    return this.http.post<TutoWhy>(`${this.apiUrl}/add_whytuto`, whytuto)
  
  }

  deleteTutoWhy(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-whytutos/${id}`)
   
  }


  
}
