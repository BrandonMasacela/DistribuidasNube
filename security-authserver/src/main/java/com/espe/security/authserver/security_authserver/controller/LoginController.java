package com.espe.security.authserver.security_authserver.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/logout")
    public String logout() {
        return "logout";
    }

    @PostMapping("/logout")
    public String logoutOK(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                .logout(logout -> logout
                        .deleteCookies("JSESSIONID")  // Eliminar cookies específicas
                        .invalidateHttpSession(true)  // Invalidar la sesión
                        .clearAuthentication(true)  // Limpiar autenticación
                );
        return "login?logout";
    }
}
