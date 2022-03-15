import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  private baseUrl = 'https://622fc63ef113bfceed40ec44.mockapi.io';
  constructor(private httpClient: HttpClient) { }

  public get(path: string, base?: number): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.get(path);
  }

  public post(path: string, data: any, base?: number): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.post(path, data || {});
  }

  public put(path: string, data: any): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.put(path, data || {});
  }

  public patch(path: string, data: any): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.patch(path, data || {});
  }

  public delete(path: string): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.delete(path);
  }

}
