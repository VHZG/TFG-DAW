package com.example.trabajoFinal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabajoFinal.dto.UserDto;
import com.example.trabajoFinal.exception.ResourceNotFoundException;
import com.example.trabajoFinal.service.UserService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserController {
    
    private UserService userService;

    public UserController( UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savesUser = userService.createUser(userDto);
        return new ResponseEntity<>(savesUser,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto, HttpSession session){
        try{
            UserDto loggedUser = userService.loginUser(userDto.getUserName(), userDto.getPassword());
            session.setAttribute("user",loggedUser);
            return new ResponseEntity<>(loggedUser, HttpStatus.OK);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        session.invalidate();
        return new ResponseEntity<>("Logged out", HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session){
        UserDto user  = (UserDto) session.getAttribute("user");
        if (user == null){
            return new ResponseEntity<>("Not Logged in", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
} 
