package com.example.musiccollaberartor.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

// Model class representing a song
@Document(collection = "songs")
@TypeAlias("Song")
public class Song {
    @Id
    private String id;
    private String title;
    private String artist;
    private String movie;
    private int likes;
    private String url; // Assuming the URL to the audio file

    // Getters and setters

    public Song() {
    }

    public Song(String id, String title, String artist, String movie, int likes, String url) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.movie = movie;
        this.likes = likes;
        this.url = url;
    }
    @Override
    public String toString() {
        return "Song{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", movie='" + movie + '\'' +
                ", likes=" + likes +
                ", url='" + url + '\'' +
                '}';
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
