package com.example.trabajoFinal.dto;

public class UserDto {
    
    private Long id;
    private String userName;
    private String password;
    private String email;

    public UserDto(Long id, String userName, String password, String email){
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

    public UserDto(){

    }


    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    } 

    public String getUserName(){
        return userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }
}
