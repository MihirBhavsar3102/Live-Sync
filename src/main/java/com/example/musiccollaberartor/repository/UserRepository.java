package com.example.musiccollaberartor.repository;

import com.example.musiccollaberartor.model.Song;
import com.example.musiccollaberartor.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

// Repository interface for interacting with MongoDB
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);

//    Boolean existsByUserName(String UserName);

}
