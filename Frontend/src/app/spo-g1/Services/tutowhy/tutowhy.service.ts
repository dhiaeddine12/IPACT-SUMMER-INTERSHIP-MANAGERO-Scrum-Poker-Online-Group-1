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


  apiUrl = `http://localhost:8081/whyttuto`; 
  constructor(private http: HttpClient) { }

  getAllTutoWhys(): Observable<TutoWhy[]> {
    return this.http.get<TutoWhy[]>(`${this.apiUrl}/retrieve-all-whytutos`);

  }

  updateTutoWhy( whytuto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-whytuto`, whytuto)
    .pipe(catchError(this.handleError));;
    
  }
  addTutoWhy(whytuto: TutoWhy): Observable<TutoWhy> {
    return this.http.post<TutoWhy>(`${this.apiUrl}/add_whytuto`, whytuto)
    .pipe(catchError(this.handleError));;
  }

  deleteTutoWhy(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-whytutos/${id}`)
    .pipe(catchError(this.handleError));;
  }


  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    return throwError('There is an issue with the service. Please try again later.');
  }
}
