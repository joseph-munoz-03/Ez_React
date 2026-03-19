package com.ezplatform.controller;

import com.ezplatform.entity.User;
import com.ezplatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public User getCurrentUser(Principal principal) {

        return userService.getUserByEmail(principal.getName());

    }

    @GetMapping("/all")
    public List<User> getUsers() {

        return userService.getAllUsers();

    }

}