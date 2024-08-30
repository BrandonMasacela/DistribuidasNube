package com.espe.msvc_cursos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class BeansConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration cors = new CorsConfiguration();
        cors.addAllowedHeader("*");
        cors.addAllowedMethod("*");
        cors.setAllowCredentials(true);
        cors.setAllowedOrigins(Arrays.asList(
                "http://:4200",
                "http://localhost:4200", // Añadir esta URL u otra que necesites
                "http://frontend:4200",// Otro dominio permitido
                "http://13.72.107.110:4200",
                "http://tuURL:4200"
        ));
        source.registerCorsConfiguration("/**", cors);
        return source;
    }
}