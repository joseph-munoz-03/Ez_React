package com.ezplatform.marketplace;

import com.ezplatform.entity.MarketplacePost;
import com.ezplatform.repository.MarketplaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MarketplaceModerationService {

    private final MarketplaceRepository repository;

    public MarketplacePost approvePost(Long id){

        MarketplacePost post = repository.findById(id)
                .orElseThrow();

        post.setApproved(true);

        return repository.save(post);
    }

    public void deletePost(Long id){

        repository.deleteById(id);

    }

}