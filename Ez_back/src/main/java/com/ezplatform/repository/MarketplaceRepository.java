package com.ezplatform.repository;

import com.ezplatform.entity.MarketplacePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarketplaceRepository extends JpaRepository<MarketplacePost, Long> {

    List<MarketplacePost> findByEngineerId(Long engineerId);

}
