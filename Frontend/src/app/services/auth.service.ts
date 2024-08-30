import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token_url = 'http://tuURL:9000/oauth2/token';
  constructor(private httpClient: HttpClient) { }

  public getToken(code: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'client');
    body.set('redirect_uri', 'http://tuURL:4200/authorized');
    body.set('scope', 'profile');
    body.set('code_verifier', 'HRtaS8MPiYSboJfdyaMDGouMt5RAHgjIPWPfRjZSkvR');
    body.set('code', code);

    const basic_auth = 'Basic ' + btoa('client:secret');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Authorization': basic_auth
    });

    const httpOptions = { headers: headers_object };
    console.log(body.toString());
    return this.httpClient.post<any>(this.token_url, body, httpOptions)
  }

}