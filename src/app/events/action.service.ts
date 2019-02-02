import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private base = '/api';

  constructor(private httpClient: HttpClient) { }

  logon(username: string): Observable<any> {
    return this.httpClient.get(`${this.base}/logon?username=${username}`, {withCredentials: true});
  }

  play(x: number, y: number): Observable<any> {
    return this.httpClient.get(`${this.base}/play/${x}/${y}`, {withCredentials: true});
  }

  reset(): Observable<any> {
    return this.httpClient.get(`${this.base}/restart`, {withCredentials: true});
  }

  synchronize(): Observable<any> {
    return this.httpClient.get(`${this.base}/sync`, {withCredentials: true});
  }

  logoff(): Observable<any> {
    return this.httpClient.get(`${this.base}/logoff`, {withCredentials: true});
  }
}
