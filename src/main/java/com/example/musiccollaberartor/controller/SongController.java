package com.example.musiccollaberartor.controller;

import com.example.musiccollaberartor.model.Song;
import com.example.musiccollaberartor.repository.SongRepository;
import com.example.musiccollaberartor.resource.SongRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Controller to handle requests
@CrossOrigin(origins = "http://localhost:3000") // Adjust the allowed origin accordingly
@RestController
//@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private SongRepository songRepository;
    public SongController(SongRepository songRepository){
        this.songRepository=songRepository;
    }

//    @GetMapping("/songs")
//    public ResponseEntity<List<Song>> getAllSongs() {
//        return ResponseEntity.ok(this.songRepository.findAll());
//    }
@GetMapping("/songs")
public ResponseEntity<List<Song>> getAllSongs() {
    List<Song> songs = songRepository.findAll();
    System.out.println("Fetched Songs: " + (songs));
    return ResponseEntity.ok(songs);
}


    @GetMapping("/songs/id/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable String id) {
        Optional<Song> song = songRepository.findById(id);
        return song.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/songs/query/{query}")
    public ResponseEntity<List<Song>> getSongByQuery(@PathVariable String query) {
        List<Song> songs = songRepository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCaseOrMovieContainingIgnoreCase(query, query, query);
        System.out.println("Fetched Songs: " + songs);
        return ResponseEntity.ok(songs);
    }




    @PostMapping("/songs")
    public ResponseEntity<Song> addSong(@RequestBody SongRequest songRequest) {
        Song song=new Song();
        song.setTitle(songRequest.getTitle());
        song.setArtist(songRequest.getArtist());
        song.setUrl(songRequest.getUrl());
        song.setImgUrl(songRequest.getImgUrl());
        song.setMovie(songRequest.getMovie());
        // Save the received song to MongoDB
        return ResponseEntity.status(201).body(this.songRepository.save(song));
    }
}
