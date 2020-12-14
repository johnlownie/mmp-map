import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { ResponseModel } from './response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

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

  public addResponse(response: ResponseModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.REST_API_SERVER, response);
  }

  public deleteResponseById(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(this.REST_API_SERVER + id);
  }

  public getResponseById(id: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.REST_API_SERVER + id).pipe(
      retry(3),
      map(data => new ResponseModel().deserialize(data)),
      catchError(this.handleError<ResponseModel>('getResponseById'))
    );
  }

  public getResponses(): Observable<ResponseModel[]> {
    return this.http.get<ResponseModel[]>(this.REST_API_SERVER).pipe(
      retry(3),
      map(data =>data.map(data => new ResponseModel().deserialize(data))),
      catchError(this.handleError<ResponseModel[]>('getResponses', []))
    );
  }
  public updateResponse(response: ResponseModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.REST_API_SERVER + response.id, response);
  }
}
