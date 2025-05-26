package com.example.trabajoFinal.mapper;

import com.example.trabajoFinal.dto.UserDto;
import com.example.trabajoFinal.entity.User;

public class UserMapper {
    
    public static UserDto mapToUserDto(User user){
        return new UserDto(
            user.getId(),
            user.getUserName(),
            user.getPassword(),
            user.getEmail()
        );
    }

    public static User mapToUser(UserDto userDto){
        return new User(
            userDto.getId(),
            userDto.getUserName(),
            userDto.getPassword(),
            userDto.getEmail()
        );
    }
}
