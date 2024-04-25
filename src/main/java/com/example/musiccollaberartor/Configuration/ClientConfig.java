package com.example.musiccollaberartor.Configuration;

import com.example.musiccollaberartor.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.Socket;

@Configuration
public class ClientConfig {

    @Bean
    public Socket socket() throws IOException {
        return new Socket();
    }


        @Bean
        public String Username() {
            return "exampleUserName";
        }
    @Bean
    public Client client(Socket socket,String Username) {
        return new Client(socket,Username);
    }



}

