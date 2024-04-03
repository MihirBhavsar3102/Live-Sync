package com.example.musiccollaberartor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.Socket;
import java.util.List;


@Service
public class Client {

    // Consider using a dependency injection framework for Socket creation
    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;
    private ObjectInputStream ois;
    private String username;
    public static String msgToSend = "Ram ram bhai sariye ne";

//    public static String msgToReceive = "Me:{\"objectId\":\"65f14c5054b3b52f7beffdd9\",\"currentTime\":83.81112,\"play_status\":true}";
    public static String msgToReceive = "";
    public static boolean sendflag = false;
    public static boolean receiveflag = false;
    public static boolean newflag = false;
    public static boolean isRunning = false;
    public static List<String> usernames;


    public Client(Socket socket, String userName) {
        try {
            this.socket = socket;
            this.username = userName;
            this.bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            this.ois = new ObjectInputStream(socket.getInputStream());
//            System.out.println("Client has connected");
        } catch (IOException ioe) {
            closeEverything();
        }
    }

    public void sendMessage() {
        try {
            bufferedWriter.write(username);
            bufferedWriter.newLine();
            bufferedWriter.flush();


            while (socket.isConnected()) {
                if (sendflag) {
                    System.out.println("Mein thread hu:" + msgToSend);
                    bufferedWriter.write(username + ":" + msgToSend);
                    bufferedWriter.newLine();
                    bufferedWriter.flush();
                    sendflag = false;
                }
                if(!isRunning){
                    closeEverything();
                    System.out.println("Client closed");
                    break;
                }
            }
        } catch (IOException ioe) {
            closeEverything();
        }
    }

    public void listenForMessage() {
        new Thread(new Runnable() {
            @Override
            public void run() {

                String msgFromGroupChat;

                while (socket.isConnected()) {
                    try {
                        msgFromGroupChat = ois.readUTF();
                        if (msgFromGroupChat.contains("aRrAy")) {
                            newflag = true;
                            usernames = (List<String>) ois.readObject();
                            for (String username : usernames) {
                                System.out.println(username);
                            }

                        } else {
//                            System.out.println("Group:"+msgFromGroupChat);
                            if (receiveflag) {
                                msgToReceive = msgFromGroupChat;
                                receiveflag = false;
                            }

                        }

                    } catch (IOException ioe) {
                        closeEverything();
                    } catch (ClassNotFoundException e) {
                        //
                    }
                }
            }
        }).start();
    }



    public void closeEverything() {
        try {
            if (bufferedReader != null) {
                bufferedReader.close();
            }
            if (bufferedWriter != null) {
                bufferedWriter.close();
            }
            if(ois!=null){
                ois.close();
            }
            if (socket != null) {
                socket.close();
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }



}
