package com.espe.security.authserver.security_authserver.repository;

import com.espe.security.authserver.security_authserver.entity.Role;
import com.espe.security.authserver.security_authserver.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRole(RoleName roleName);
}
