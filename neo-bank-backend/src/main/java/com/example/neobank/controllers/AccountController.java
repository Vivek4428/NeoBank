package com.example.neobank.controllers;

import com.example.neobank.models.Account;
import com.example.neobank.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Get account details by username
    @GetMapping("/{username}")
    public ResponseEntity<?> getAccountByUsername(@PathVariable String username) {
        Optional<Account> account = accountService.getAccountByUsername(username);
        return account.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get account details by account number
    @GetMapping("/number/{accountNumber}")
    public ResponseEntity<?> getAccountByNumber(@PathVariable String accountNumber) {
        Optional<Account> account = accountService.getAccountByAccountNumber(accountNumber);
        return account.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update account info (for profile or preferences)
    @PutMapping("/update")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
        Account updated = accountService.updateAccount(account);
        return ResponseEntity.ok(updated);
    }

    // Get current balance by username
    @GetMapping("/balance/{username}")
    public ResponseEntity<Double> getBalance(@PathVariable String username) {
        double balance = accountService.getBalanceByUsername(username);
        return ResponseEntity.ok(balance);
    }
}
