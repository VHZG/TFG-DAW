package com.example.trabajoFinal.controller;

import com.example.trabajoFinal.dto.CategoryDto;
import com.example.trabajoFinal.dto.TaskDto;
import com.example.trabajoFinal.repository.TaskRepository;
import com.example.trabajoFinal.service.CategoryService;
import com.example.trabajoFinal.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;
    private CategoryService categoryService;

    public TaskController(TaskService taskService, CategoryService categoryService){
        this.taskService = taskService;
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId){
        TaskDto taskDto = taskService.getTaskById(taskId);

        return ResponseEntity.ok(taskDto);
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTask(){
        List<TaskDto> task = taskService.getAllTask();

        return ResponseEntity.ok(task);
    }

    @GetMapping("allCategories")
    public ResponseEntity<List<CategoryDto>> getAllCategory(){
        List<CategoryDto> category = categoryService.getAllCategories();

        return ResponseEntity.ok(category);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskDto>> getTaskByStatus(@PathVariable("status") String status) {
        List<TaskDto> tasks = taskService.getTaskByStatus(status);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId, @RequestBody TaskDto updateTask){
        TaskDto taskDto = taskService.updateTask(taskId, updateTask);

        return ResponseEntity.ok(taskDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId){
        taskService.deleteTask((taskId));

        return ResponseEntity.ok("Task deleted successfully!");
    }

    @PostMapping("/bulk")
    public ResponseEntity<String> createMultipleTasks(@RequestBody List<TaskDto> taskDtos) {
        try {
            for (TaskDto taskDto : taskDtos) {
                taskService.createTask(taskDto);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("All tasks created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create tasks: " + e.getMessage());
        }
    }



}
