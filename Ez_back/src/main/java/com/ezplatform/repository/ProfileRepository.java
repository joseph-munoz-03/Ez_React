package com.ezplatform.repository;

import com.ezplatform.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository
        extends JpaRepository<Profile, Long> {
}