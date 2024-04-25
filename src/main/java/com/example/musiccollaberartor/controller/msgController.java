package com.example.musiccollaberartor.controller;

import com.example.musiccollaberartor.Client;
import com.example.musiccollaberartor.ClientHandler;
import com.example.musiccollaberartor.Server;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the allowed origin accordingly
@RestController
public class msgController {

    @PostMapping("/send_msg")
    public String msgFromClient(@RequestBody String send_msg){
        Client.msgToSend=send_msg;
//        System.out.println("Send=>"+send_msg);
        Client.sendflag =true;
        return "msg sent successfully!!";
    }



    @PostMapping("/receive_msg")
    public ResponseEntity<String> msgToClient() {
        String message="";
        if(Client.newflag){

            for(String content: Client.usernames){
                message += content+":";
            }
            Client.newflag=false;
        }
        else{
           message= Client.msgToReceive;
        Client.receiveflag=true;

        }
//        System.out.println("Receive=>"+message);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @PostMapping("/Client")
    public void StartClient(  @RequestParam String ipAddress,
                              @RequestParam int port,
                              @RequestParam String username){
        try{
//            Socket socket=new Socket(ipAddress,port);
                Socket socket = new Socket(ipAddress, port);
                Client client = new Client(socket, username);
                Client.isRunning=true;
                client.listenForMessage();
                client.sendMessage();

        }
        catch (IOException e){
            System.out.println(e);
        }
    }


    @PostMapping("/Server")
    public void StartServer(@RequestBody String Port){
       try{
               ServerSocket serverSocket = new ServerSocket(Integer.parseInt(Port));
               Server server = new Server(serverSocket);
               Server.isRunning=true;
               server.startServer();
       }
       catch (IOException e){
           System.out.println(e);
       }
    }

    @PostMapping("/close_server")
    public ResponseEntity<String> closeServer(){
            ClientHandler.isRunning=false;
//            Server.isRunning=false;
            return ResponseEntity.status(HttpStatus.OK).body("Server closed successfully");
    }

    @PostMapping("/close_client")
    public ResponseEntity<String> closeClient(){
//        Client.msgToSend="closing!!!!";
//        Client.sendflag =true;
            Client.isRunning=false;
            return ResponseEntity.status(HttpStatus.OK).body("Client closed successfully");
    }



}

