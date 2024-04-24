package com.example.musiccollaberartor;

import java.io.*;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;


public class ClientHandler implements Runnable{

    public static ArrayList<ClientHandler> clientHandlers=new ArrayList<>();
    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;
    private ObjectOutputStream oos;
    private String clientUsername;

    public static boolean isRunning=false;

    public ClientHandler(Socket socket){
        try{
            this.socket=socket;
            this.bufferedWriter=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            this.bufferedReader=new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.oos=new ObjectOutputStream(socket.getOutputStream());
            this.clientUsername=bufferedReader.readLine(); //Waiting for the Client to send the message
            clientHandlers.add(this);
            broadcastMessage(clientUsername+" has entered the chat!",true);
        }catch(IOException e){
            closeEverything(socket,bufferedReader,bufferedWriter);
        }

    }

    @Override
    public void run(){
        String messageFromClient;

        while(socket.isConnected()){
            try{
                isRunning=true;
                messageFromClient=bufferedReader.readLine();
                if(!isRunning){
                    closeEverything(socket,bufferedReader,bufferedWriter);
                    System.out.println("Client-handler closed");
                    Server.closeServerSocket();
                    System.out.println("Server closed");
                    break;
                }
                broadcastMessage(messageFromClient,false);
            }catch(IOException e){
                closeEverything(socket,bufferedReader,bufferedWriter);
                break;
            }
        }
    }

    public void broadcastMessage(String messageToSend,boolean isArray){
        for(ClientHandler clientHandler: clientHandlers){
            try{

                if(isArray){
                    clientHandler.oos.writeUTF("aRrAy");
                    clientHandler.oos.writeObject(getUsernames(messageToSend));
                    clientHandler.oos.flush();
                }
                else{
                    if(!clientHandler.clientUsername.equals(clientUsername)){
                        clientHandler.oos.writeUTF(messageToSend);
                        clientHandler.bufferedWriter.newLine();
                        clientHandler.oos.flush();
                    }
                }

            }catch(IOException ioe){
                closeEverything(socket, bufferedReader, bufferedWriter);
            }
        }
    }

    public void removeClientHandler(){
        clientHandlers.remove(this);
        broadcastMessage("SERVER: "+clientUsername+" has left the chat!",true);
    }

    public void closeEverything(Socket socket,BufferedReader bufferedReader,BufferedWriter bufferedWriter){
        removeClientHandler();
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

    public static List<String> getUsernames(String msg) {
        List<String> usernames = new ArrayList<>();
        for(ClientHandler clientHandler:clientHandlers){
            usernames.add(clientHandler.clientUsername);
        }
        usernames.add(msg);
        return usernames;
    }
}
