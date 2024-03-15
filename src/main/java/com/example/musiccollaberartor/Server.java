package com.example.musiccollaberartor;

//import java.io.IOException;
//import java.net.*;
//
//public class Server {
//   private ServerSocket serverSocket;
//
//   public Server(ServerSocket serverSocket){
//        this.serverSocket=serverSocket;
//   }
//
//   public void startServer(){
//    try{
//        while(!serverSocket.isClosed()){
//
//            Socket socket=serverSocket.accept();
//            System.out.println("A new client has connected");
//
//            ClientHandler clientHandler=new ClientHandler(socket);
//
//            Thread thread = new Thread(clientHandler);
//            thread.start();
//        }
//    }catch( IOException ioe){
//
//    }
//   }
//
//   public void closeServerSocket(){
//        try{
//            if(serverSocket!=null){
//                serverSocket.close();
//            }
//        }catch(IOException e){
//            e.printStackTrace();
//        }
//   }
//
//   public static void main(String[] args) throws IOException {
//
//        ServerSocket serverSocket=new ServerSocket(8080);
//        Server server=new Server(serverSocket);
//        server.startServer();
//   }
//}

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

@SpringBootApplication
public class Server {

    public static void main(String[] args) {
        SpringApplication.run(Server.class, args);
    }

    @RestController
    public static class ServerController {

        private ServerSocket serverSocket;

        @GetMapping("/startServer")
        public void startServer() {
            try {
                serverSocket = new ServerSocket(1234);
                while (true) {
                    Socket socket = serverSocket.accept();
                    System.out.println("A new client has connected");

                    ClientHandler clientHandler = new ClientHandler(socket);
                    Thread thread = new Thread(clientHandler);
                    thread.start();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        @GetMapping("/closeServerSocket")
        public void closeServerSocket() {
            try {
                if (serverSocket != null) {
                    serverSocket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
