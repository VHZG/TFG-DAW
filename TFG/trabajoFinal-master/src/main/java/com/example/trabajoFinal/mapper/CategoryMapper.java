package com.example.trabajoFinal.mapper;

import com.example.trabajoFinal.dto.CategoryDto;
import com.example.trabajoFinal.entity.Category;

public class CategoryMapper {

    public static CategoryDto mapToCategoryDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getCategoryName()
        );
    }

    public static Category mapToCategory(CategoryDto categoryDto) {
        return new Category(
                categoryDto.getId(),
                categoryDto.getCategoryName()
        );
    }
}
