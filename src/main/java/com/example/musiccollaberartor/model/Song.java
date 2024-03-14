package com.example.musiccollaberartor.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;



// Model class representing a song
@Document(collection = "songs")
@TypeAlias("Song")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize


public class Song {
    @Id
    private String id;
    private String title;
    private String artist;
    private String movie;
    private String imgUrl;
    private String url; // Assuming the URL to the audio file

    // Getters and setters

    public Song() {
    }
//    public Song(String title, String artist, String movie, String imgUrl, String url) {
    public Song(String id, String title, String artist, String movie, String imgUrl, String url) {
//        this.id = id;
        this.title = title;
        this.artist = artist;
        this.movie = movie;
        this.imgUrl =  imgUrl;
        this.url = url;
    }
    @Override
    public String toString() {
        return "Song{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", movie='" + movie + '\'' +
                ",  imgUrl=" + imgUrl +
                ", url='" + url + '\'' +
                '}';
    }

//    public void setId(String id) {
//        this.id = id;
//    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public void setImgUrl(String imgUrl) {
        this. imgUrl =  imgUrl;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public String getMovie() {
        return movie;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getUrl() {
        return url;
    }
}
