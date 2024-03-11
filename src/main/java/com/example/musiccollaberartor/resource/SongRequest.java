package com.example.musiccollaberartor.resource;

public class SongRequest {
    private String title;
    private String artist;
    private String movie;
    private int likes;
    private String url;

    public SongRequest() {

    }

    public SongRequest(String title, String artist, String movie, int likes, String url) {
        this.title = title;
        this.artist = artist;
        this.movie = movie;
        this.likes = likes;
        this.url = url;
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

    public int getLikes() {
        return likes;
    }

    public String getUrl() {
        return url;
    }
}
