export interface CursoUsuario {
  id: number;
  usuarioId: number;
}

export interface Curso {
  id: number;
  nombre: string;
  cursoUsuarios: CursoUsuario[];
}
