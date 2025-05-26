package com.example.trabajoFinal.dto;

public class CategoryDto {

    private Long id;
    private String categoryName;

    public CategoryDto() {
    }

    public CategoryDto(Long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setName(String categoryName) {
        this.categoryName = categoryName;
    }
}
