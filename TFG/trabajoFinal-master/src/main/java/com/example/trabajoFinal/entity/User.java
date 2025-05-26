package com.example.trabajoFinal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( name = "user_name" )
    private String userName;

    @Column( name = "password" )
    private String password;

    @Column( name = "email" )
    private String email;

    public User(Long id, String userName, String password, String email){

        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

    public User(){

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
