package com.example.musiccollaberartor;

import java.io.*;
import java.net.Socket;
import java.util.List;
import java.util.Scanner;

public class Client {

    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;
    private ObjectInputStream ois;
    private String username;

    public Client(Socket socket, String username){
        try{
            this.socket=socket;
            this.username=username;
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

            Scanner scanner=new Scanner(System.in);
            while(socket.isConnected()){
                String messageToSend=scanner.nextLine(); //From Front-end
                bufferedWriter.write(username+": "+messageToSend);
                bufferedWriter.newLine();
                bufferedWriter.flush();
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

    public static void main(String[] args) throws IOException{

        Scanner scanner=new Scanner(System.in);
        System.out.println("Enter your username for the group chat: ");
        String username=scanner.nextLine();
        Socket socket=new Socket("localhost",3000);
        Client client=new Client(socket,username);
        client.listenForMessage();
        client.sendMessage();

    }
}
