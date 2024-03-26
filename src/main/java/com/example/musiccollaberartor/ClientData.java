package com.example.musiccollaberartor;

public class ClientData {
    private String ip;
    private String username;
    private int port;

    // Getters and setters (or use Lombok for automatic getters/setters)

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}

