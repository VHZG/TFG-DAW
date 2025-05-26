package com.example.trabajoFinal.service.impl;

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.trabajoFinal.dto.UserDto;
import com.example.trabajoFinal.entity.User;
import com.example.trabajoFinal.exception.ResourceNotFoundException;
import com.example.trabajoFinal.mapper.UserMapper;
import com.example.trabajoFinal.repository.UserRepository;
import com.example.trabajoFinal.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
        // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        
        User user = UserMapper.mapToUser(userDto);

        // user.setPassword(encoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto loginUser(String userName, String password) {

        User user = userRepository.findByUserName(userName)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // if(!encoder.matches(password, user.getPassword())){
        //     throw new ResourceNotFoundException("Invalid password");
        // }

        return UserMapper.mapToUserDto(user);
    }
    
}
