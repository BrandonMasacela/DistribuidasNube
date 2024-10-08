import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  //resourceUrl = 'http://localhost:8003/resource/';
  resourceUrl = 'http://tuURL:8003/resource/';

  constructor(private httpClient: HttpClient) { }

  public user(): Observable<any> {
    return this.httpClient.get<any>(this.resourceUrl + 'user');
  }

  public admin(): Observable<any> {
    return this.httpClient.get<any>(this.resourceUrl + 'admin');
  }

  getRoles(): Observable<any> {
    return this.httpClient.get<any>(this.resourceUrl + 'roles');
  }
}
