import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.interface';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private apiUrl = 'http://localhost:8001/api/usuarios';
  private apiUrl = 'http://tuURL:8001/api/usuarios';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getAccessToken(); // Ajusta según la implementación
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario/MostrarUsuarios`, { headers: this.getAuthHeaders() });
  }

  public get(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/BuscarUsuarioPorID/${id}`, { headers: this.getAuthHeaders() });
  }

  public create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario/CrearUsuario`, usuario, { headers: this.getAuthHeaders() });
  }

  public update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuario/ModificarUsuario/${id}`, usuario, { headers: this.getAuthHeaders() });
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuario/EliminarUsuario/${id}`, { headers: this.getAuthHeaders() });
  }
}
