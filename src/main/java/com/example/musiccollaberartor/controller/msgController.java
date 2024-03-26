package com.example.musiccollaberartor.controller;

import com.example.musiccollaberartor.Client;
import com.example.musiccollaberartor.ClientData;
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
        System.out.println("msg :"+send_msg);
        Client.flag=true;
        Client.msgToSend=send_msg;
        return "msg received successfully!!";
    }

    @PostMapping("/receive_msg")
    public ResponseEntity<String> msgToClient(@RequestBody(required = false) String message) {
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }
//@PostMapping("/receive_msg")
//public ResponseEntity<String> receiveMessage(
//        @RequestBody String message,
//        @RequestHeader(name = "X-Source", required = false) String source
//) {
//    if ("Java".equals(source)) {
//        // Message sent from Java file
//        // Process the message accordingly
//        System.out.println("Received message from Java: " + message);
//        return ResponseEntity.status(HttpStatus.OK).body("Message received from Java: " + message);
//    } else {
//        // Message sent from JavaScript
//        // Process the message accordingly
//        System.out.println("Received message from JavaScript: " + message);
//        return ResponseEntity.status(HttpStatus.OK);
//    }
//}

    @PostMapping("/Client")
    public void StartClient(@RequestBody ClientData clientData){
        try{

            String ipAddress = clientData.getIp();
            String username = clientData.getUsername();
            int port = clientData.getPort();

            Socket socket=new Socket(ipAddress,port);
            Client client=new Client(socket,username);
            client.sendMessage();
            client.listenForMessage();
        }
        catch (IOException e){
            System.out.println(e);
        }
    }




    @PostMapping("/Server")
    public void StartServer(@RequestBody String Port){
       try{
        ServerSocket serverSocket=new ServerSocket(Integer.parseInt(Port));
        Server server=new Server(serverSocket);
        server.startServer();
       }
       catch (IOException e){
           System.out.println(e);
       }
    }



}

