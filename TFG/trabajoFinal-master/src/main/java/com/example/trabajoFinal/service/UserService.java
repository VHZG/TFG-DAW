package com.example.trabajoFinal.service;

import com.example.trabajoFinal.dto.UserDto;

public interface UserService {
    
    UserDto createUser(UserDto userDto);

    UserDto loginUser(String userName,String password);
}
