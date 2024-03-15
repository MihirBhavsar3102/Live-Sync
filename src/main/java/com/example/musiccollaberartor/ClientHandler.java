package com.example.musiccollaberartor;

//import java.io.BufferedReader;
//import java.io.BufferedWriter;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.OutputStreamWriter;
//import java.net.Socket;
//import java.util.ArrayList;
//import java.util.List;
//
////import com.google.gson.Gson;
//
//public class ClientHandler implements Runnable{
//
//    public static ArrayList<ClientHandler> clientHandlers=new ArrayList<>();
//    private Socket socket;
//    private BufferedReader bufferedReader;
//    private BufferedWriter bufferedWriter;
//    private String clientUsername;
//
//    public ClientHandler(Socket socket){
//        try{
//            this.socket=socket;
//            this.bufferedWriter=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
//            this.bufferedReader=new BufferedReader(new InputStreamReader(socket.getInputStream()));
//            this.clientUsername=bufferedReader.readLine(); //Waiting for the Client to send the message
//            clientHandlers.add(this);
//            broadcastMessage("SERVER: "+clientUsername+" has entered the chat!");
//
//        }catch(IOException e){
//            closeEverything(socket,bufferedReader,bufferedWriter);
//        }
//
//    }
//
//    @Override
//    public void run(){
//        String messageFromClient;
//
//        while(socket.isConnected()){
//            try{
//                messageFromClient=bufferedReader.readLine();
//                broadcastMessage(messageFromClient);
//            }catch(IOException e){
//                closeEverything(socket,bufferedReader,bufferedWriter);
//                break;
//            }
//        }
//    }
//
//    public void broadcastMessage(String messageToSend){
//        for(ClientHandler clientHandler: clientHandlers){
//            try{
//                if(!clientHandler.clientUsername.equals(clientUsername)){
//                    clientHandler.bufferedWriter.write(messageToSend);
//                    clientHandler.bufferedWriter.newLine();
//                    clientHandler.bufferedWriter.flush();
//                }
//            }catch(IOException ioe){
//                closeEverything(socket, bufferedReader, bufferedWriter);
//            }
//        }
//    }
//
//    public void removeClientHandler(){
//        clientHandlers.remove(this);
//        broadcastMessage("SERVER: "+clientUsername+"has left the chat!");
//    }
//
//    public void closeEverything(Socket socket,BufferedReader bufferedReader,BufferedWriter bufferedWriter){
//        removeClientHandler();
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
//    public static List<String> getUsernames() {
//        List<String> usernames = new ArrayList<>();
//
//        usernames.add("Harsh");
//        usernames.add("Mihir");
//        usernames.add("Bhadrika");
//        return usernames;
//    }

    // Sample method to convert Java object to JSON string
//    public static String convertToJson(Object object) {
//        Gson gson = new Gson();
//        return gson.toJson(object);
//    }
//}

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.ArrayList;

@RestController
public class ClientHandler implements Runnable {

    public static ArrayList<ClientHandler> clientHandlers = new ArrayList<>();
    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;
    private String clientUsername;

    public ClientHandler(Socket socket) {
        try {
            this.socket = socket;
            this.bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            this.bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.clientUsername = bufferedReader.readLine();
            clientHandlers.add(this);
            broadcastMessage("SERVER: " + clientUsername + " has entered the chat!");
        } catch (IOException e) {
            closeEverything(socket, bufferedReader, bufferedWriter);
        }
    }

    @Override
    public void run() {
        String messageFromClient;

        while (socket.isConnected()) {
            try {
                messageFromClient = bufferedReader.readLine();
                broadcastMessage(messageFromClient);
            } catch (IOException e) {
                closeEverything(socket, bufferedReader, bufferedWriter);
                break;
            }
        }
    }

    @GetMapping("/broadcastMessage")
    public void broadcastMessage(String messageToSend) {
        for (ClientHandler clientHandler : clientHandlers) {
            try {
                if (!clientHandler.clientUsername.equals(clientUsername)) {
                    clientHandler.bufferedWriter.write(messageToSend);
                    clientHandler.bufferedWriter.newLine();
                    clientHandler.bufferedWriter.flush();
                }
            } catch (IOException ioe) {
                closeEverything(socket, bufferedReader, bufferedWriter);
            }
        }
    }

    public void removeClientHandler() {
        clientHandlers.remove(this);
        broadcastMessage("SERVER: " + clientUsername + " has left the chat!");
    }

    public void closeEverything(Socket socket, BufferedReader bufferedReader, BufferedWriter bufferedWriter) {
        removeClientHandler();
        try {
            if (bufferedReader != null) {
                bufferedReader.close();
            }
            if (bufferedWriter != null) {
                bufferedWriter.close();
            }
            if (socket != null) {
                socket.close();
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
}