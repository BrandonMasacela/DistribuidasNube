package com.espe.security.authserver.security_authserver.dto;

import java.util.List;

public record CreateAppUserDto (
    String username,
    String password,
    List<String> roles){}

