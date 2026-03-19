package com.ezplatform.oauth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GoogleUserInfo {

    private String email;
    private String name;
    private String picture;

}