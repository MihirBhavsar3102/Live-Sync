package com.example.musiccollaberartor.repository;

import com.example.musiccollaberartor.model.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

// Repository interface for interacting with MongoDB
public interface SongRepository extends MongoRepository<Song, String> {
    List<Song> findAll();
    // You can add custom query methods if needed
}
