import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Curso } from '../model/curso.interface';
import { Usuario } from '../model/usuario.interface';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //private apiUrl = 'http://localhost:8002/api/cursos';
  private apiUrl = 'http://tuURL:8002/api/cursos';
  
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getAccessToken(); // Ajusta según la implementación
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public list(): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.apiUrl}/curso/MostrarCursos`, { headers: this.getAuthHeaders() });
  }

  public get(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/curso/BuscarCursoPorID/${id}`, { headers: this.getAuthHeaders() });
  }

  public create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/curso/CrearCurso`, curso, { headers: this.getAuthHeaders() });
  }

  public update(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/curso/ModificarCurso/${id}`, curso, { headers: this.getAuthHeaders() });
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/curso/EliminarCurso/${id}`, { headers: this.getAuthHeaders() });
  }

  asignarUsuario(idcurso: number, usuario: Usuario) {
    return this.http.put(`${this.apiUrl}/asignar-usuario/${idcurso}`, usuario, { headers: this.getAuthHeaders() });
  }
}
