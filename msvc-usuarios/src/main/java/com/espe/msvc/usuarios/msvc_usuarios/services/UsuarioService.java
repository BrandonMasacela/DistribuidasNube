package com.espe.msvc.usuarios.msvc_usuarios.services;

import com.espe.msvc.usuarios.msvc_usuarios.models.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<Usuario> listar();
    Optional<Usuario> porId(long id);
    Usuario guardar(Usuario usuario);
    void eliminar(long id);
}
