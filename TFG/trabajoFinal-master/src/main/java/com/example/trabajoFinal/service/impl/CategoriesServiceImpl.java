package com.example.trabajoFinal.service.impl;

import com.example.trabajoFinal.dto.CategoryDto;
import com.example.trabajoFinal.entity.Category;
import com.example.trabajoFinal.mapper.CategoryMapper;
import com.example.trabajoFinal.repository.CategoryRepository;
import com.example.trabajoFinal.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriesServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    public CategoriesServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map((category) -> CategoryMapper.mapToCategoryDto(category))
                .collect(Collectors.toUnmodifiableList());
    }
}
