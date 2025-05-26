package com.example.trabajoFinal.dto;

public class TaskDto {

    private Long id;
    private String taskName;
    private String status;
    private Long categoryId;
    private String categoryName;


    public TaskDto(Long id, String taskName, String status, Long categoryId , String categoryName ) {
        this.id = id;
        this.taskName = taskName;
        this.status = status;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public TaskDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
