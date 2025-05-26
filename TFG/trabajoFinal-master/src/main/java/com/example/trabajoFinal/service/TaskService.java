package com.example.trabajoFinal.service;

import com.example.trabajoFinal.dto.TaskDto;

import java.util.List;

public interface TaskService {

    TaskDto createTask(TaskDto taskDto);

    TaskDto getTaskById(Long taskId);

    List<TaskDto> getAllTask();

    List<TaskDto> getTaskByStatus(String status);

    TaskDto updateTask(Long taskId, TaskDto updatedTask);

    void deleteTask(Long taskId);


}
