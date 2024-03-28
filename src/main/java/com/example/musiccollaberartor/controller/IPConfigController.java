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
            // Execute ipconfig command
            Process process = Runtime.getRuntime().exec("ipconfig");

            // Read output from the command
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Close the reader
            reader.close();

            // Parse output to extract IPv4 address
            String ipConfigOutput = output.toString();
            String ipv4Address = parseIPv4Address(ipConfigOutput);
            return ipv4Address != null ? ipv4Address : "IPv4 address not found";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error executing ipconfig command";
        }
    }

    // Method to parse IPv4 address from ipconfig output
    // Method to parse IPv4 address from ipconfig output
    private String parseIPv4Address(String ipConfigOutput) {
        // Regular expression pattern to match IPv4 address
        String ipv4Pattern = "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b";

        // Create a pattern object with the IPv4 pattern
        Pattern pattern = Pattern.compile(ipv4Pattern);

        // Create a matcher object to apply the pattern to the ipConfigOutput
        Matcher matcher = pattern.matcher(ipConfigOutput);

        // Find the first match (IPv4 address)
        if (matcher.find()) {
            // Return the matched IPv4 address
            return matcher.group();
        } else {
            // Return null if IPv4 address is not found
            return null;
        }
    }

}
