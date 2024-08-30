package com.espe.security.authserver.security_authserver.federated;

import com.espe.security.authserver.security_authserver.entity.GoogleUser;
import com.espe.security.authserver.security_authserver.repository.GoogleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

@RequiredArgsConstructor
@Slf4j
public final class UserRepositoryOAuth2UserHandler implements Consumer<OAuth2User> {

    private final GoogleUserRepository googleUserRepository;

    @Override
    public void accept(OAuth2User user) {
        // Capture user in a local data store on first authentication
        if (!this.googleUserRepository.findByEmail(user.getAttribute("email")).isPresent()) {
            GoogleUser googleUser = GoogleUser.fromOAut2User(user);
            log.info(googleUser.toString());
            this.googleUserRepository.save(googleUser);
        }else {
            log.info("Bienvenido {}", user.getAttributes().get("given_name"));
        }
    }


}