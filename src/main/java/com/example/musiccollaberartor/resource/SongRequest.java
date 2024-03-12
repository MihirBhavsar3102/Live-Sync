package com.example.musiccollaberartor.resource;

public class SongRequest {
    private String title;
    private String artist;
    private String movie;
    private String  imgUrl;
    private String url;

    public SongRequest() {

    }

    public SongRequest(String title, String artist, String movie, int likes, String url) {
        this.title = title;
        this.artist = artist;
        this.movie = movie;
        this. imgUrl =  imgUrl;
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

    public String getImgUrl() {
        return imgUrl;
    }

    public String getUrl() {
        return url;
    }
}
