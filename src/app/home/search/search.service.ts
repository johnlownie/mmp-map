import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { SearchModel } from './search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private log(message: string) {
    console.log(message);
  }  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  } 

  public getRepresentative(postalCode: string): Observable<SearchModel> {
    return this.http.get<SearchModel>("https://represent.opennorth.ca/postcodes/" + postalCode + "/?sets=federal-electoral-districts").pipe(
      retry(3),
      map(data => new SearchModel().deserialize(data)),
      catchError(this.handleError<SearchModel>('getRepresentative'))
    );
  }

}
