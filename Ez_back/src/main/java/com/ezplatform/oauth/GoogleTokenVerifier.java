package com.ezplatform.oauth;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class GoogleTokenVerifier {

    public GoogleUserInfo verify(String idToken){

        String url =
                "https://oauth2.googleapis.com/tokeninfo?id_token="+idToken;

        RestTemplate rest=new RestTemplate();

        Map response=rest.getForObject(url,Map.class);

        GoogleUserInfo user=new GoogleUserInfo();

        user.setEmail((String)response.get("email"));
        user.setName((String)response.get("name"));
        user.setPicture((String)response.get("picture"));

        return user;

    }

}
