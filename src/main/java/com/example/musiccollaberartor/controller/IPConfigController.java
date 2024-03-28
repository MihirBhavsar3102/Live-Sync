package com.example.musiccollaberartor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api")
public class IPConfigController {

    @GetMapping("/ipv4")
    public String getIPv4Address() {
        try {
            // Execute ipconfig command with /all parameter to get detailed information about all adapters
            Process process = Runtime.getRuntime().exec("ipconfig /all");

            // Read output from the command
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Close the reader
            reader.close();

            // Parse output to extract IPv4 address for Wi-Fi adapter
            String ipConfigOutput = output.toString();
            String wifiIPv4Address = parseWiFiIPv4Address(ipConfigOutput);
            return wifiIPv4Address != null ? wifiIPv4Address : "localhost";

        } catch (IOException e) {
            e.printStackTrace();
            return "Error executing ipconfig command";
        }
    }

    // Method to parse IPv4 address from ipconfig output
    // Method to parse IPv4 address from ipconfig output
//    private String parseIPv4Address(String ipConfigOutput) {
//        // Regular expression pattern to match IPv4 address
//        String ipv4Pattern = "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b";
//
//        // Create a pattern object with the IPv4 pattern
//        Pattern pattern = Pattern.compile(ipv4Pattern);
//
//        // Create a matcher object to apply the pattern to the ipConfigOutput
//        Matcher matcher = pattern.matcher(ipConfigOutput);
//
//        // Find the first match (IPv4 address)
//        if (matcher.find()) {
//            // Return the matched IPv4 address
//            return matcher.group();
//        } else {
//            // Return null if IPv4 address is not found
//            return null;
//        }
//    }

    // Method to parse IPv4 address for Wi-Fi adapter from ipconfig output
    private String parseWiFiIPv4Address(String ipConfigOutput) {
        // Split the ipconfig output into lines for easier processing
        String[] lines = ipConfigOutput.split("\n");

        // Flag to indicate if we are currently parsing the Wi-Fi adapter section
        boolean parsingWifiSection = false;

        // Loop through each line in the ipconfig output
        for (String line : lines) {
            // Check if the line contains the identifier for the Wi-Fi adapter section
            if (line.contains("Wireless LAN adapter Wi-Fi")) {
                parsingWifiSection = true; // Start parsing the Wi-Fi adapter section
            } else if (parsingWifiSection) {
                // Check if the line contains the IPv4 address for the Wi-Fi adapter
                if (line.trim().startsWith("IPv4 Address")) {
                    // Extract the IPv4 address from the line
                    String[] parts = line.split(":");
                    if (parts.length > 1) {
                        // Trim leading and trailing spaces from the IPv4 address
                        String ipv4Address = parts[1].trim();
                        return ipv4Address;
                    }
                } else if (line.trim().startsWith("Physical Address")) {
                    // Stop parsing when we reach the next adapter section
                    break;
                }
            }
        }

        return null; // IPv4 address not found for Wi-Fi adapter
    }


}
