package com.example.neobank.controllers;

import com.example.neobank.models.Transaction;
import com.example.neobank.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction saved = transactionService.recordTransaction(transaction);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Transaction>> getByUsername(@PathVariable String username) {
        List<Transaction> list = transactionService.getTransactionsByUsername(username);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<List<Transaction>> getByAccount(@PathVariable String accountNumber) {
        List<Transaction> list = transactionService.getTransactionsByAccount(accountNumber);
        return ResponseEntity.ok(list);
    }
}
