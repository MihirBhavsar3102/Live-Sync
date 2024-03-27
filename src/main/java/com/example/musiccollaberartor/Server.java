package com.example.musiccollaberartor;
//
//import java.io.IOException;
//import java.net.*;
//
//public class Server {
//    private ServerSocket serverSocket;
//
//    public Server(ServerSocket serverSocket){
//        this.serverSocket=serverSocket;
//    }
//
//    public void startServer(){
//        try{
//            while(!serverSocket.isClosed()){
//
//                Socket socket=serverSocket.accept();
//                System.out.println("A new client has connected");
//
//                ClientHandler clientHandler=new ClientHandler(socket);
//
//                Thread thread = new Thread(clientHandler);
//                thread.start();
//            }
//        }catch( IOException ioe){
//
//        }
//    }
//
//    public void closeServerSocket(){
//        try{
//            if(serverSocket!=null){
//                serverSocket.close();
//            }
//        }catch(IOException e){
//            e.printStackTrace();
//        }
//    }
//
//    public static void main(String[] args) throws IOException {
//
//        ServerSocket serverSocket=new ServerSocket(3000);
//        Server server=new Server(serverSocket);
//        server.startServer();
//    }
//}
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

@Service
public class Server {

    private ServerSocket serverSocket;

    public Server(ServerSocket serverSocket) {
        this.serverSocket= serverSocket;
    }

//    @PostConstruct
    public void startServer() {
        try {
//            serverSocket = new ServerSocket(3000);
            System.out.println("Server has started");
            while (!serverSocket.isClosed()) {
                Socket socket = serverSocket.accept();
                System.out.println("A new client has connected");

                ClientHandler clientHandler = new ClientHandler(socket);
                Thread thread = new Thread(clientHandler);
                thread.start();
            }
        } catch (IOException e) {
            closeServerSocket();
        }
    }

    public void closeServerSocket(){
        try{
            if(serverSocket!=null){
                serverSocket.close();
            }
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public ServerSocket getServerSocket() {
        return serverSocket;
    }

    public void setServerSocket(ServerSocket serverSocket) {
        this.serverSocket = serverSocket;
    }
}
