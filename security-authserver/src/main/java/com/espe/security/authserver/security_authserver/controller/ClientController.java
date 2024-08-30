package com.espe.security.authserver.security_authserver.controller;

import com.espe.security.authserver.security_authserver.dto.CreateClientDto;
import com.espe.security.authserver.security_authserver.dto.MessageDto;
import com.espe.security.authserver.security_authserver.service.ClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
@Slf4j
public class ClientController {
    private final ClientService clientService;

    @PostMapping("/create")
    public ResponseEntity<MessageDto> createClient(@RequestBody CreateClientDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.create(dto));
    }
}
