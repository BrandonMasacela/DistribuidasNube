package com.espe.security.authserver.security_authserver.controller;

import com.espe.security.authserver.security_authserver.dto.CreateAppUserDto;
import com.espe.security.authserver.security_authserver.dto.MessageDto;
import com.espe.security.authserver.security_authserver.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppUserService appUserService;

    @PostMapping("/create")
    public ResponseEntity<MessageDto> createUser(@RequestBody CreateAppUserDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(appUserService.createUser(dto));
    }
}
