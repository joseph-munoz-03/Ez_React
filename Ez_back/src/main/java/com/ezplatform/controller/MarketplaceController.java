package com.ezplatform.controller;

import com.ezplatform.entity.MarketplacePost;
import com.ezplatform.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {

    private final MarketplaceService marketplaceService;

    @PostMapping
    public MarketplacePost createPost(
            @RequestBody MarketplacePost post,
            Principal principal){

        return marketplaceService.createPost(principal.getName(), post);

    }

    @GetMapping
    public List<MarketplacePost> getPosts(){

        return marketplaceService.getAllPosts();

    }

    @GetMapping("/{id}")
    public MarketplacePost getPost(@PathVariable Long id){

        return marketplaceService.getPost(id);

    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){

        marketplaceService.deletePost(id);

    }

}