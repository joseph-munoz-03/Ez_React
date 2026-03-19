package com.ezplatform.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private final String SECRET = "EZ_PLATFORM_SUPER_SECRET_KEY_2026_JWT_TOKEN_GENERATOR";

    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email){

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+86400000))
                .signWith(getKey())
                .compact();

    }

    public String extractEmail(String token){

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

    }

    public boolean isValid(String token){

        try{

            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);

            return true;

        }catch(Exception e){
            return false;
        }

    }

}