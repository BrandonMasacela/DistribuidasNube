package com.espe.msvc_cursos.servicies;

import com.espe.msvc_cursos.clients.UsuarioClientRest;
import com.espe.msvc_cursos.models.Usuario;
import com.espe.msvc_cursos.models.entity.Curso;
import com.espe.msvc_cursos.models.entity.CursoUsuario;
import com.espe.msvc_cursos.repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServiceImpl implements CursoService{
    @Autowired
    private CursoRepository repository;

    @Autowired
    UsuarioClientRest usuarioClientRest;

    @Override
    public List<Curso> listar() {
        return (List<Curso>) repository.findAll();
    }

    @Override
    public Optional<Curso> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    public Curso guardar(Curso curso) {
        return repository.save(curso);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Usuario> agregarUsuario(Usuario usuario, Long idCurso) {
        Optional<Curso> o = repository.findById(idCurso);
        if (o.isPresent()) {
            Curso curso = o.get();

            // Verificar si el usuario ya está inscrito en el curso
            boolean yaInscrito = curso.getCursoUsuarios()
                    .stream()
                    .anyMatch(cu -> cu.getUsuarioId().equals(usuario.getId()));

            if (yaInscrito) {
                // Si el usuario ya está inscrito, retornar un Optional.empty() y un mensaje de error
                return Optional.empty();
            }

            // Si el usuario no está inscrito, proceder a agregarlo
            Usuario usuarioMicro = usuarioClientRest.detalle(usuario.getId());

            CursoUsuario cursoUsuario = new CursoUsuario();
            cursoUsuario.setUsuarioId(usuarioMicro.getId());

            curso.addCursoUsuario(cursoUsuario);
            repository.save(curso);

            return Optional.of(usuarioMicro);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Usuario> crearUsuario(Usuario usuario, Long idCurso) {

        Optional<Curso> o = repository.findById(idCurso);
        if (o.isPresent()) {
            Usuario usuarioMicro = usuarioClientRest.crear(usuario);

            Curso curso = o.get();
            CursoUsuario cursoUsuario = new CursoUsuario();
            cursoUsuario.setUsuarioId(usuarioMicro.getId());

            curso.addCursoUsuario(cursoUsuario);
            repository.save(curso);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Usuario> eliminarUsuario(Usuario usuario, Long idCurso) {
        Optional<Curso> o = repository.findById(idCurso);
        if (o.isPresent()) {
            Usuario usuarioMicro = usuarioClientRest.detalle(usuario.getId());

            Curso curso = o.get();
            CursoUsuario cursoUsuario = new CursoUsuario();
            cursoUsuario.setUsuarioId(usuarioMicro.getId());

            curso.addCursoUsuario(cursoUsuario);
            repository.save(curso);
        }

        return Optional.empty();
    }

    @Override
    public Optional<Usuario> desmatricularUsuario(Long idCurso, Long idUsuario) {
        Optional<Curso> o = repository.findById(idCurso);
        if (o.isPresent()) {
            Curso curso = o.get();

            // Find the CursoUsuario that matches the given idUsuario
            CursoUsuario cursoUsuario = curso.getCursoUsuarios()
                    .stream()
                    .filter(cu -> cu.getUsuarioId().equals(idUsuario))
                    .findFirst()
                    .orElse(null);

            if (cursoUsuario != null) {
                curso.getCursoUsuarios().remove(cursoUsuario);
                repository.save(curso);

                // Optionally, you might want to return the details of the removed user
                Usuario usuario = usuarioClientRest.detalle(idUsuario);
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }
}
