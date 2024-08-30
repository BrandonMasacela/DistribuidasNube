export interface Usuario {
  id: number;
  nombre: string;
  correoElectronico: string;
}

export interface CursoUsuario {
  id: number;
  usuarioId: number;
  usuario: Usuario; // Incluye la información del usuario
}

export interface Curso1 {
  id: number;
  nombre: string;
  cursoUsuarios: CursoUsuario[];
}
