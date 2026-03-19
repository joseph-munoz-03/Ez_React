package com.ezplatform.service;

import com.ezplatform.entity.Profile;
import com.ezplatform.entity.User;
import com.ezplatform.repository.ProfileRepository;
import com.ezplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public Profile updateProfile(String email, Profile profileData) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository
                .findAll()
                .stream()
                .filter(p -> p.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElse(new Profile());

        profile.setName(profileData.getName());
        profile.setPhone(profileData.getPhone());
        profile.setUser(user);

        return profileRepository.save(profile);
    }

}