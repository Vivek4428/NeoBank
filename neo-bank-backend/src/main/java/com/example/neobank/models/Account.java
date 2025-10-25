package com.example.neobank.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("accounts")
public class Account {

    @Id
    private String id;

    private String username;
    private String fullName;
    private String email;
    private String password;
    private String role = "USER"; // include for JWT & authorization consistency
    private String accountNumber;

    private String accountType;
    private Double initialDeposit;
    private Double balance; // updated after every transaction

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

    private String registrationStatus = "BASIC_COMPLETED";
}
