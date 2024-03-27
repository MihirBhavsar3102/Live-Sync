package com.example.musiccollaberartor.controller;

import com.example.musiccollaberartor.model.User;
import com.example.musiccollaberartor.repository.SongRepository;
import com.example.musiccollaberartor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the allowed origin accordingly
@RestController

public class UserController {
    @Autowired
    private UserRepository userRepository;
    public UserController(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        User existingUser = userRepository.findByEmailAndPassword(email, password);
        if (existingUser != null) {
            return ResponseEntity.ok(existingUser);
        } else {
            if(userRepository.findByEmail(email)!=null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("New User!! SignUp First");
        }
    }

    @PostMapping("/user/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {

        if (userRepository.existsByuserName(user.getUserName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        User newUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

}