package com.ezplatform.marketplace;

import com.ezplatform.entity.MarketplacePost;
import com.ezplatform.repository.MarketplaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarketplaceFilterService {

    private final MarketplaceRepository repository;

    public List<MarketplacePost> search(String keyword){

        return repository.findAll()
                .stream()
                .filter(post -> post.getTitle()
                        .toLowerCase()
                        .contains(keyword.toLowerCase()))
                .collect(Collectors.toList());

    }

}