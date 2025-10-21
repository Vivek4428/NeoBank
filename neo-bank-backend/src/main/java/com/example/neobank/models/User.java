package com.example.neobank.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
public class User {
    @Id
    private String id;

    private String username;
    private String email;
    private String password;
    private String fullName;
    private String role = "USER";

    // --- Step 2 Details ---
    private String accountType;
    private Double initialDeposit;
    private Boolean chequebookRequired;
    private Boolean emailAlerts;
    private Boolean smsAlerts;

    private String dob;
    private String gender;
    private String phone;

    private String currentAddress;
    private String permanentAddress;
    private String city;
    private String state;
    private String pincode;

    private String aadhaarNumber;
    private String panNumber;

    private String securityQuestion;
    private String securityAnswer;

    // Optional status flag
    private String registrationStatus = "BASIC_COMPLETED"; // or "FULL_COMPLETED"
}
