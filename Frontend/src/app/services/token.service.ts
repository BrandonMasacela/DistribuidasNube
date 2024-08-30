import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //private tokenEndpoint = 'http://localhost:9000/oauth2/token';
  private tokenEndpoint = 'http://tuURL:9000/oauth2/token';
  httpClient: any;

  constructor(private http: HttpClient) { }

  setTokens(access_token: string, refresh_token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.setItem(ACCESS_TOKEN, access_token);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.setItem(REFRESH_TOKEN, refresh_token);
    } else {
      console.error('localStorage is not available');
    }
  }

  getAccessToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN);
    } else {
      //console.error('localStorage is not available');
      return null;
    }
  }

  exchangeCodeForToken(code: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'client');
    //body.set('redirect_uri', 'http://:4200/authorized');
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
    return this.http.post<any>(this.tokenEndpoint, body, httpOptions)
  }

}
