package com.espe.security.authserver.security_authserver.repository;

import com.espe.security.authserver.security_authserver.entity.GoogleUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GoogleUserRepository extends JpaRepository<GoogleUser, Integer> {

    Optional<GoogleUser> findByEmail(String email);
}
