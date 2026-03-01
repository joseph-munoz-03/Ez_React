package com.example.ez.controller.common;

import com.example.ez.service.user.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/find")
    public String find() {
        return "user endpoint";
    }
}