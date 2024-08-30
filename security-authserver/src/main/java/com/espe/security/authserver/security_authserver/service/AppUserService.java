package com.espe.security.authserver.security_authserver.service;

import com.espe.security.authserver.security_authserver.dto.CreateAppUserDto;
import com.espe.security.authserver.security_authserver.dto.MessageDto;
import com.espe.security.authserver.security_authserver.entity.AppUser;
import com.espe.security.authserver.security_authserver.entity.Role;
import com.espe.security.authserver.security_authserver.enums.RoleName;
import com.espe.security.authserver.security_authserver.repository.AppUserRepository;
import com.espe.security.authserver.security_authserver.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository repository;
    private final PasswordEncoder passwordEncoder;

    public MessageDto createUser(CreateAppUserDto dto){
        AppUser appUser = AppUser.builder()
                .username(dto.username())
                .password(passwordEncoder.encode(dto.password()))
                .build();
        Set<Role> roles = new HashSet<>();
        dto.roles().forEach(r ->{
            Role role = repository.findByRole(RoleName.valueOf(r))
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(role);
        });
        appUser.setRoles(roles);
        appUserRepository.save(appUser);
        return new MessageDto("User created" + appUser.getUsername());
    }
}
