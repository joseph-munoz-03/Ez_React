package com.ezplatform.service;

import com.ezplatform.entity.MarketplacePost;
import com.ezplatform.entity.User;
import com.ezplatform.repository.MarketplaceRepository;
import com.ezplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketplaceService {

    private final MarketplaceRepository marketplaceRepository;
    private final UserRepository userRepository;

    public MarketplacePost createPost(String email, MarketplacePost post){

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        post.setEngineer(user);
        post.setApproved(false);

        return marketplaceRepository.save(post);
    }

    public List<MarketplacePost> getAllPosts(){

        return marketplaceRepository.findAll();

    }

    public MarketplacePost getPost(Long id){

        return marketplaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

    }

    public void deletePost(Long id){

        marketplaceRepository.deleteById(id);

    }

}