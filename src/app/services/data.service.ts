import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { FearModel } from '../models/fear.model';
import { RepresentativeModel } from '../models/representative.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'https://my-json-server.typicode.com/johnlownie/jsonplaceholder/fears/';

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

  public createFear(fear: FearModel): Observable<FearModel> {
    return this.http.post<FearModel>(this.REST_API_SERVER, fear);
  }

  public deleteFearById(id: number): Observable<FearModel> {
    return this.http.delete<FearModel>(this.REST_API_SERVER + id);
  }

  public getFearById(id: number): Observable<FearModel> {
    return this.http.get<FearModel>(this.REST_API_SERVER + id).pipe(
      retry(3),
      map(data => new FearModel().deserialize(data)),
      catchError(this.handleError<FearModel>('getFearById'))
    );
  }

  public getFears(): Observable<FearModel[]> {
    return this.http.get<FearModel[]>(this.REST_API_SERVER).pipe(
      retry(3),
      map(data =>data.map(data => new FearModel().deserialize(data))),
      catchError(this.handleError<FearModel[]>('getFears', []))
    );
  }

  public getRepresentative(postalCode: string): Observable<RepresentativeModel> {
    return this.http.get<RepresentativeModel>("https://represent.opennorth.ca/postcodes/" + postalCode + "/?sets=federal-electoral-districts").pipe(
      retry(3),
      map(data => new RepresentativeModel().deserialize(data)),
      catchError(this.handleError<RepresentativeModel>('getRepresentative'))
    );
  }

  public updateFear(fear: FearModel): Observable<FearModel> {
    return this.http.post<FearModel>(this.REST_API_SERVER + fear.id, fear);
  }
}
