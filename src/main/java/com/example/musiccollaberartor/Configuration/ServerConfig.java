package com.example.musiccollaberartor.Configuration;

import com.example.musiccollaberartor.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.ServerSocket;

@Configuration
public class ServerConfig {

    @Bean
    public ServerSocket serverSocket() throws IOException {
        return new ServerSocket();
    }

    @Bean
    public Server server(ServerSocket serverSocket) {
        return new Server(serverSocket);
    }
}
