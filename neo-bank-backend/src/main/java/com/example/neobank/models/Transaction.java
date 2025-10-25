package com.example.neobank.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("transactions")
public class Transaction {

    @Id
    private String id;

    private String username;
    private String accountNumber;

    private String type; // "DEPOSIT", "WITHDRAWAL", "TRANSFER"
    private Double amount;
    private String description;
    private String status; // "SUCCESS", "FAILED", "PENDING"

    private LocalDateTime timestamp = LocalDateTime.now();
    private String referenceId; // Unique reference for each transaction
}
