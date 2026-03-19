package com.ezplatform.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class MarketplacePostDTO {

    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Long engineerId;
    private String engineerName;

}
