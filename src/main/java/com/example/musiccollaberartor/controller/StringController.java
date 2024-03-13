package com.example.musiccollaberartor.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StringController {

    @GetMapping("/data")
    public ResponseEntity<List<String>> getMyData() {
        // Create or fetch your ArrayList here
        List<String> myList = new ArrayList<>();
        // Add objects to myList
        myList.add("Hello");
        myList.add("Hii");
        myList.add("Chalo");
        // Return the list in a ResponseEntity to control HTTP status codes and headers
        return ResponseEntity.ok(myList);
    }
}


