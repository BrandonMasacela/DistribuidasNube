package com.espe.security.authserver.security_authserver;

import com.espe.security.authserver.security_authserver.entity.Role;
import com.espe.security.authserver.security_authserver.enums.RoleName;
import com.espe.security.authserver.security_authserver.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SecurityAuthserverApplication /*implements CommandLineRunner*/ {

	/*@Autowired
	RoleRepository roleRepository;*/

	public static void main(String[] args) {
		SpringApplication.run(SecurityAuthserverApplication.class, args);
	}

	/*@Override
	public void run(String... args) throws Exception {
		Role adminRole = Role.builder().role(RoleName.ROLE_ADMIN).build();
		Role userRole = Role.builder().role(RoleName.ROLE_USER).build();
		roleRepository.save(adminRole);
		roleRepository.save(userRole);
	}*/
}
