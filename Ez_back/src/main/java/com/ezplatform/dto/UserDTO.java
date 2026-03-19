package com.ezplatform.dto;

import com.ezplatform.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Long id;
    private String email;
    private Role role;

}