package com.example.neobank.services;

import com.example.neobank.models.Account;
import com.example.neobank.models.Transaction;
import com.example.neobank.repositories.TransactionRepository;
import com.example.neobank.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    // Record transaction and update account balance
    public Transaction recordTransaction(Transaction transaction) {
        Account account = accountRepository.findByAccountNumber(transaction.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        double balance = account.getBalance();

        switch (transaction.getType().toUpperCase()) {
            case "DEPOSIT":
                balance += transaction.getAmount();
                break;
            case "WITHDRAWAL":
                if (balance < transaction.getAmount()) {
                    transaction.setStatus("FAILED");
                    transaction.setDescription("Insufficient balance");
                    return transactionRepository.save(transaction);
                }
                balance -= transaction.getAmount();
                break;
            default:
                transaction.setStatus("FAILED");
                transaction.setDescription("Invalid transaction type");
                return transactionRepository.save(transaction);
        }

        account.setBalance(balance);
        accountRepository.save(account);

        transaction.setReferenceId("TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        transaction.setStatus("SUCCESS");
        transaction.setDescription("Transaction completed successfully");

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByUsername(String username) {
        return transactionRepository.findByUsername(username);
    }

    public List<Transaction> getTransactionsByAccount(String accountNumber) {
        return transactionRepository.findByAccountNumber(accountNumber);
    }
}
