package com.example.trabajoFinal.service.impl;

import com.example.trabajoFinal.dto.TaskDto;
import com.example.trabajoFinal.entity.Category;
import com.example.trabajoFinal.entity.Task;
import com.example.trabajoFinal.exception.ResourceNotFoundException;
import com.example.trabajoFinal.mapper.TaskMapper;
import com.example.trabajoFinal.repository.CategoryRepository;
import com.example.trabajoFinal.repository.TaskRepository;
import com.example.trabajoFinal.service.TaskService;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private CategoryRepository categoryRepository;

    public TaskServiceImpl( TaskRepository taskRepository, CategoryRepository categoryRepository){
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {

        Category category = categoryRepository.findByCategoryName(taskDto.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + taskDto.getCategoryName()));

        Task task = TaskMapper.mapToTask(taskDto, category);

        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }

    @Override
    public TaskDto getTaskById(Long taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with the given ID" + taskId));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public List<TaskDto> getAllTask(){
        List<Task> tasks = taskRepository.findAll();

        return tasks.stream().map((task) -> TaskMapper.mapToTaskDto(task))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<TaskDto> getTaskByStatus(String status) {
        List<Task> tasks = taskRepository.findByStatus(status);
        return tasks.stream()
                .map(TaskMapper::mapToTaskDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto updatedTask) {

        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task doesn't exist with the given Id: " + taskId)
        );

        task.setTaskName(updatedTask.getTaskName());
        task.setStatus(updatedTask.getStatus());

        Category category = categoryRepository.findByCategoryName(updatedTask.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + updatedTask.getCategoryName()));

        task.setCategory(category);

        Task updateTaskObj = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updateTaskObj);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task doesn't exist with the given Id: " + taskId)
        );

        taskRepository.deleteById(taskId);

    }


}
