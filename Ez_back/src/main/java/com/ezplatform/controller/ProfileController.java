package com.ezplatform.controller;

import com.ezplatform.entity.Profile;
import com.ezplatform.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PutMapping
    public Profile updateProfile(
            @RequestBody Profile profile,
            Principal principal) {

        return profileService.updateProfile(principal.getName(), profile);

    }

}