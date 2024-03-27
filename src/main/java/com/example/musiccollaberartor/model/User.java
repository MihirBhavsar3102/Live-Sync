package com.example.musiccollaberartor.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@TypeAlias("User")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String UserName;
    private String email;
    private String password;
    private String photo;
    private Integer likes;


    public User(String id, String name, String email, String photo, Integer likes, String password) {
        this.id = id;
        this.UserName = name;
        this.email = email;
        this.photo = photo;
        this.likes = likes;
        this.password=password;
    }

    public User() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String name) {
        UserName = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public String getUserName() {
        return UserName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoto() {
        return photo;
    }

    public Integer getLikes() {
        return likes;
    }
}