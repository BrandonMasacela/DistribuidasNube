import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Curso } from '../model/curso.interface';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CursoUsuarioService {

  //private apiUrl = 'http://localhost:8002/api/cursos';
  private apiUrl = 'http://tuURL:8002/api/cursos';
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getAccessToken(); // Ajusta según la implementación
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/curso/MostrarCursos`, { headers: this.getAuthHeaders() });
  }

  public asignarUsuario(idcurso: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/asignar-usuario/${idcurso}`, usuario, { headers: this.getAuthHeaders() });
  }

  public desmatricularUsuario(idcurso: number, idusuario: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/desmatricular-usuario/${idcurso}/${idusuario}`, {}, { headers: this.getAuthHeaders() });
  }

}
