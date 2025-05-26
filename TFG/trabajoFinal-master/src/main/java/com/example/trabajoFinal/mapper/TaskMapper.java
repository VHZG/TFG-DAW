package com.example.trabajoFinal.mapper;

import com.example.trabajoFinal.dto.TaskDto;
import com.example.trabajoFinal.entity.Category;
import com.example.trabajoFinal.entity.Task;

public class TaskMapper {

    public static TaskDto mapToTaskDto(Task task){
        return new TaskDto(
            task.getId(),
            task.getTaskName(),
            task.getStatus(),
            task.getCategory().getId(),
            task.getCategory().getCategoryName()
        );
    }

    public static Task mapToTask(TaskDto taskDto, Category category){
        return new Task(
            taskDto.getId(),
            taskDto.getTaskName(),
            taskDto.getStatus(),
            category
        );
    }
}
