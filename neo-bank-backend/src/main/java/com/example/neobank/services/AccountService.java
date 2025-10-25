package com.example.neobank.services;

import com.example.neobank.models.Account;
import com.example.neobank.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // Create a new account
    public Account createAccount(Account account) {
        account.setAccountNumber("AC-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        account.setBalance(account.getInitialDeposit());
        return accountRepository.save(account);
    }

    // Get account by username
    public Optional<Account> getByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    // Update balance (deposit or withdraw)
    public Account updateBalance(String accountNumber, Double newBalance) {
        Account acc = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        acc.setBalance(newBalance);
        return accountRepository.save(acc);
    }
}
