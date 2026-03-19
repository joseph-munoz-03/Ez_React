package com.ezplatform.oauth;

import com.ezplatform.dto.AuthResponse;
import lombok.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/google")
@RequiredArgsConstructor
public class GoogleOAuthController {

    private final GoogleOAuthService service;

    @PostMapping
    public AuthResponse login(@RequestBody GoogleRequest request) {

        return service.login(request.getIdToken());

    }
}

@Getter
@Setter
class GoogleRequest {

    private String idToken;

}