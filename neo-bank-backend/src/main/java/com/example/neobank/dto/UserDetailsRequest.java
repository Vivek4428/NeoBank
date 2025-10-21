package com.example.neobank.dto;

import lombok.Data;

@Data
public class UserDetailsRequest {
    private String username; // Identify user

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
}
