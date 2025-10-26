package com.example.neobank.services;

import com.example.neobank.models.Account;
import com.example.neobank.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // Find account by username
    public Optional<Account> getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    // Find account by account number
    public Optional<Account> getAccountByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    // Update account details
    public Account updateAccount(Account account) {
        Optional<Account> existing = accountRepository.findByUsername(account.getUsername());
        if (existing.isEmpty()) {
            throw new RuntimeException("Account not found for username: " + account.getUsername());
        }

        Account existingAccount = existing.get();
        // Preserve immutable fields
        account.setId(existingAccount.getId());
        account.setAccountNumber(existingAccount.getAccountNumber());
        account.setBalance(existingAccount.getBalance());

        return accountRepository.save(account);
    }

    // Get balance for dashboard display
    public double getBalanceByUsername(String username) {
        return accountRepository.findByUsername(username)
                .map(Account::getBalance)
                .orElse(0.0);
    }
}
