package com.espe.security.authserver.security_authserver.repository;

import com.espe.security.authserver.security_authserver.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findByClientId(String clientId);
}
