package com.example.musiccollaberartor.repository;

import com.example.musiccollaberartor.model.Song;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

// Repository interface for interacting with MongoDB
public interface SongRepository extends MongoRepository<Song, String> {
    List<Song> findAll();
    List<Song> findByTitleIsLike(String title);
    List<Song> findByMovie(String movie);

    List<Song> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCaseOrMovieContainingIgnoreCase(String title, String artist, String movie);

}
