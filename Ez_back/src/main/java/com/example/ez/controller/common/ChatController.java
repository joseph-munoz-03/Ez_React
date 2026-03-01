package com.example.ez.controller.common;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @GetMapping
    public String chat() {
        return "chat endpoint";
    }
}