package com.example.musiccollaberartor.controller;

import com.example.musiccollaberartor.Client;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the allowed origin accordingly
@RestController
public class msgController {

    @PostMapping("/send_msg")
    public String msg_client(@RequestBody String send_msg){
        System.out.println("msg :"+send_msg);
        Client client=new Client();
        client.receive_msg(send_msg);
        return "msg received successfully!!";



    }

}
