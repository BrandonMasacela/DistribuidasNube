package com.espe.resource.server.resource_server.controller;

import com.espe.resource.server.resource_server.dto.MessageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'OIDC_USER')")
    public ResponseEntity<MessageDto> user(Authentication authentication) {
        return ResponseEntity.ok(new MessageDto("Bienvenido " + authentication.getName()));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<MessageDto> admin(Authentication authentication) {
        return ResponseEntity.ok(new MessageDto("Bienvenido " + authentication.getName()));
    }

    @GetMapping("/roles")
    public ResponseEntity<Map<String, Object>> getRoles(Authentication authentication) {
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("roles", roles);
        return ResponseEntity.ok(response);
    }
}
