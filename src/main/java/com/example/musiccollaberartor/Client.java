package com.example.musiccollaberartor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.Socket;
import java.util.List;

//
//import java.io.*;
//import java.net.Socket;
//import java.util.List;
//import java.util.Scanner;
//
//public class Client {
//
//    private Socket socket;
//    private BufferedReader bufferedReader;
//    private BufferedWriter bufferedWriter;
//    private ObjectInputStream ois;
//    private String username;
//
//    public Client(Socket socket, String username){
//        try{
//            this.socket=socket;
//            this.username=username;
//            this.bufferedReader=new BufferedReader(new InputStreamReader(socket.getInputStream()));
//            this.bufferedWriter=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
//            this.ois=new ObjectInputStream(socket.getInputStream());
//        }catch(IOException ioe){
//            closeEverything(socket, bufferedReader,bufferedWriter);
//        }
//    }
//
//    public void sendMessage(){
//        try{
//            bufferedWriter.write(username);
//            bufferedWriter.newLine();
//            bufferedWriter.flush();
//
//            Scanner scanner=new Scanner(System.in);
//            while(socket.isConnected()){
//                String messageToSend=scanner.nextLine(); //From Front-end
//                bufferedWriter.write(username+": "+messageToSend);
//                bufferedWriter.newLine();
//                bufferedWriter.flush();
//            }
//        }catch(IOException ioe){
//            closeEverything(socket, bufferedReader,bufferedWriter);
//        }
//    }
//
//    public void listenForMessage(){
//        new Thread(new Runnable(){
//            @Override
//            public void run(){
//                String msgFromGroupChat;
//
//                while(socket.isConnected()){
//                    try{
//                        msgFromGroupChat= ois.readUTF();
//                        if(msgFromGroupChat.contains("aRrAy")){
//                            List<String> usernames=(List<String>)ois.readObject();
//                            String test=ois.readUTF();//
//                            for(String username:usernames){
//                                System.out.println(username);
//                            }
//                            System.out.println(test);
//                        }else{
//                            System.out.println(msgFromGroupChat);
//                        }
//                    }catch(IOException ioe){
//                        closeEverything(socket, bufferedReader,bufferedWriter);
//                    } catch (ClassNotFoundException e) {
//                        //
//                    }
//                }
//            }
//        }).start();
//    }
//
//    public void closeEverything(Socket socket,BufferedReader bufferedReader,BufferedWriter bufferedWriter){
//        try{
//            if(bufferedReader!=null){
//                bufferedReader.close();
//            }
//            if(bufferedWriter!=null){
//                bufferedWriter.close();
//            }
//            if(socket!=null){
//                socket.close();
//            }
//        }catch(IOException ioe){
//            ioe.printStackTrace();
//        }
//    }
//
//    public static void main(String[] args) throws IOException{
//
//        Scanner scanner=new Scanner(System.in);
//        System.out.println("Enter your username for the group chat: ");
//        String username=scanner.nextLine();
//        Socket socket=new Socket("localhost",3000);
//        Client client=new Client(socket,username);
//        client.listenForMessage();
//        client.sendMessage();
//
//    }
//}
//import jakarta.annotation.PostConstruct;
//import org.springframework.stereotype.Service;
//import java.io.*;
//import java.net.Socket;
//import java.util.Scanner;
//
//@Service
//public class Client {
//
//    @PostConstruct
//    public void initClient() {
//       // Scanner scanner = new Scanner(System.in);
//     //   System.out.println("Enter your username for the group chat: ");
//       // String username = scanner.nextLine();
//
//        try {
//            Socket socket = new Socket("localhost", 3000);
//            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
//
//            new Thread(() -> {
//                try {
//                    while (true) {
//                        String msgFromGroupChat = bufferedReader.readLine();
//                        if (msgFromGroupChat != null) {
//                            System.out.println(msgFromGroupChat);
//                        }
//                    }
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }).start();
//
//            while (true) {
//              //  String messageToSend = scanner.nextLine();
//            //    bufferedWriter.write(username + ": " + messageToSend);
//                bufferedWriter.newLine();
//                bufferedWriter.flush();
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//}
@Service
public class Client {

    // Consider using a dependency injection framework for Socket creation
    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;
    private ObjectInputStream ois;
    private String username;
    public static String msgToSend="Ram ram bhai sariye ne";
    public static boolean flag=false;

    RestTemplate restTemplate = new RestTemplate();

//    public Client(Socket socket, String username){
//
//    }

    public Client(Socket socket, String userName){
        try{
            this.socket=socket;
            this.username=userName;
            this.bufferedReader=new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.bufferedWriter=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            this.ois=new ObjectInputStream(socket.getInputStream());
        }catch(IOException ioe){
            closeEverything(socket, bufferedReader,bufferedWriter);
        }
    }
    public void sendMessage(){
        try{
            bufferedWriter.write(username);
            bufferedWriter.newLine();
            bufferedWriter.flush();


            while(socket.isConnected()){
                if (flag == true) {
                    bufferedWriter.write(username + ": " + msgToSend);
                    bufferedWriter.newLine();
                    bufferedWriter.flush();
                    flag=false;
                }
            }
        }catch(IOException ioe){
            closeEverything(socket, bufferedReader,bufferedWriter);
        }
    }

    public void listenForMessage(){
        new Thread(new Runnable(){
            @Override
            public void run(){
                String msgFromGroupChat;

                while(socket.isConnected()){
                    try{
                        msgFromGroupChat= ois.readUTF();
                        if(msgFromGroupChat.contains("aRrAy")){
                            List<String> usernames=(List<String>)ois.readObject();
                            String test=ois.readUTF();//
                            for(String username:usernames){
                                System.out.println(username);
                            }
                            System.out.println(test);
                        }else{
                            System.out.println(msgFromGroupChat);
                            ResponseEntity<Void> response = restTemplate.postForObject("http://localhost:8080/receive_msg",msgFromGroupChat, ResponseEntity.class);
//                            System.out.println("Response from server: " + response.getBody());
                            if (response.getStatusCode().is2xxSuccessful()) {
                                System.out.println("Message sent successfully");
                            } else {
                                System.err.println("Failed to send message to server");
                            }

                        }

                    }catch(IOException ioe){
                        closeEverything(socket, bufferedReader,bufferedWriter);
                    } catch (ClassNotFoundException e) {
                        //
                    }
                }
            }
        }).start();
    }

//    public static String receiveMsg(String string )
//    {
//        return string;
//    }


        // Initialize socket connection (consider pooling or lazy loading)





        // Send username (assuming the original logic is preserved)
        // ... (code similar to original Client.sendMessage())

        // Handle sending custom data from the frontend (if applicable)
//        if (data != null && !data.isEmpty()) {
//            // ... (send data using socket streams)
//        }

        // Start a separate thread for receiving messages
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                // ... (code similar to original Client.listenForMessage())
//            }
//        }).start();


    public void closeEverything(Socket socket,BufferedReader bufferedReader,BufferedWriter bufferedWriter){
        try{
            if(bufferedReader!=null){
                bufferedReader.close();
            }
            if(bufferedWriter!=null){
                bufferedWriter.close();
            }
            if(socket!=null){
                socket.close();
            }
        }catch(IOException ioe){
            ioe.printStackTrace();
        }
        }
}
