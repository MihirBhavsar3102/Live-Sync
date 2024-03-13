package com.example.musiccollaberartor.resource;

import org.springframework.data.annotation.Id;

public class UserRequest {
    @Id
    private String id;
    private String Name;
    private String email;
    private String photo;
    private Integer likes;

    public UserRequest(String id, String name, String email, String photo, Integer likes) {
        this.id = id;
        Name = name;
        this.email = email;
        this.photo = photo;
        this.likes = likes;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return Name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoto() {
        return photo;
    }

    public Integer getLikes() {
        return likes;
    }
}

