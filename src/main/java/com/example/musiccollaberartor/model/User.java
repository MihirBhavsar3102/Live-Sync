package com.example.musiccollaberartor.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@TypeAlias("User")
public class User {
    @Id
    private String id;
    private String Name;
    private String email;
    private String photo;
    private Integer likes;


    public User(String id, String name, String email, String photo, Integer likes) {
        this.id = id;
        Name = name;
        this.email = email;
        this.photo = photo;
        this.likes = likes;
    }

    public User() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        Name = name;
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
}