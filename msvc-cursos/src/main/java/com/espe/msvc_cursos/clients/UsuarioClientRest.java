package com.espe.msvc_cursos.clients;

import com.espe.msvc_cursos.models.Usuario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@FeignClient(name = "msvc-usuarios", url = "msvc-usuarios:8001")
public interface UsuarioClientRest {

    @GetMapping("/api/usuarios/usuario/BuscarUsuarioPorID/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    Usuario detalle(@PathVariable long id);

    @PostMapping("/api/usuarios/usuario/CrearUsuario")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    Usuario crear(@RequestBody Usuario usuario);
}
