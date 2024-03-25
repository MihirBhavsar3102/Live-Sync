package com.example.musiccollaberartor.controller;

import com.example.musiccollaberartor.Client;
import com.example.musiccollaberartor.Server;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the allowed origin accordingly
@RestController
public class msgController {

    @PostMapping("/send_msg")
    public String msg_client(@RequestBody String send_msg){
        System.out.println("msg :"+send_msg);
Client.flag=true;
        Client.msgToSend=send_msg;
        return "msg received successfully!!";
    }

    @PostMapping("/receive_msg")
    public String msgToFrontend(@RequestBody String receive_msg){
//        System.out.println("msg :"+send_msg);
//        Client.flag=true;
//        Client.msgToSend=send_msg;
        return "msg received successfully!!";
    }

    @PostMapping("/receive_msg")
    public ResponseEntity<String> receiveMessage(@RequestBody String message) {
        // Store the received message


        // Respond with the received message
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }


    @PostMapping("/Client")
    public String StartClient(@RequestBody String ip,String Username,int port){
        try{
            Socket socket=new Socket(ip,port);
            Client client=new Client(socket,Username);
            client.sendMessage();
            client.listenForMessage();


        }
        catch (IOException e){
            System.out.println(e);
        }
//        System.out.println("msg :"+send_msg);
//        Client client=new Client();
//        client.receive_msg(send_msg);
        return "msg received successfully!!";



    }




    @PostMapping("/Server")
    public String StartServer(@RequestBody int Port){
       try{
        ServerSocket serverSocket=new ServerSocket(Port);
        Server server=new Server(serverSocket);
        server.startServer();


       }
       catch (IOException e){
           System.out.println(e);
       }
//        System.out.println("msg :"+send_msg);
//        Client client=new Client();
//        client.receive_msg(send_msg);
        return "msg received successfully!!";



    }



}

