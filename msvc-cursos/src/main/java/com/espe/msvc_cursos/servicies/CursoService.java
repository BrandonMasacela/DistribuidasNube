package com.espe.msvc_cursos.servicies;

import com.espe.msvc_cursos.models.Usuario;
import com.espe.msvc_cursos.models.entity.Curso;
import com.fasterxml.jackson.annotation.OptBoolean;

import java.util.List;
import java.util.Optional;

public interface CursoService {
    List<Curso> listar();
    Optional<Curso> porId(Long id);
    Curso guardar(Curso curso);
    void eliminar(Long id);
    Optional<Usuario> agregarUsuario(Usuario usuario, Long idCurso);
    Optional<Usuario> crearUsuario(Usuario usuario, Long idCurso);
    Optional<Usuario> eliminarUsuario(Usuario usuario, Long idCurso);
    Optional<Usuario> desmatricularUsuario(Long idCurso, Long idUsuario); 
}
