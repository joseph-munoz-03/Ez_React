package com.ezplatform.oauth;

import com.ezplatform.dto.AuthResponse;
import com.ezplatform.entity.User;
import com.ezplatform.repository.UserRepository;
import com.ezplatform.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService {

    private final GoogleTokenVerifier verifier;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse login(String token){

        GoogleUserInfo googleUser=verifier.verify(token);

        User user=userRepository
                .findByEmail(googleUser.getEmail())
                .orElseGet(()->{

                    User newUser=new User();

                    newUser.setEmail(googleUser.getEmail());
                    newUser.setPassword("");
                    newUser.setProvider("GOOGLE");

                    return userRepository.save(newUser);

                });

        String jwt=jwtService.generateToken(user.getEmail());

        return new AuthResponse(jwt);

    }

}
