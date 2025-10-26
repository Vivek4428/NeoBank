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

    // Record a transaction and update account balances
    public Transaction recordTransaction(Transaction transaction) {
        Account account = accountRepository.findByAccountNumber(transaction.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        double balance = account.getBalance();

        switch (transaction.getType().toUpperCase()) {
            case "DEPOSIT" -> {
                balance += transaction.getAmount();
                account.setBalance(balance);
                transaction.setStatus("SUCCESS");
                transaction.setDescription("Deposit successful");
            }

            case "WITHDRAWAL" -> {
                if (balance < transaction.getAmount()) {
                    transaction.setStatus("FAILED");
                    transaction.setDescription("Insufficient balance");
                    return transactionRepository.save(transaction);
                }
                balance -= transaction.getAmount();
                account.setBalance(balance);
                transaction.setStatus("SUCCESS");
                transaction.setDescription("Withdrawal successful");
            }

            case "TRANSFER" -> {
                if (balance < transaction.getAmount()) {
                    transaction.setStatus("FAILED");
                    transaction.setDescription("Insufficient balance for transfer");
                    return transactionRepository.save(transaction);
                }

                // Get recipient
                String targetAccountNumber = transaction.getDescription();
                Account targetAccount = accountRepository.findByAccountNumber(targetAccountNumber)
                        .orElseThrow(() -> new RuntimeException("Recipient account not found"));

                // Update balances
                balance -= transaction.getAmount();
                targetAccount.setBalance(targetAccount.getBalance() + transaction.getAmount());

                accountRepository.save(targetAccount);
                account.setBalance(balance);

                transaction.setStatus("SUCCESS");
                transaction.setDescription("Transfer successful to " + targetAccountNumber);
            }

            default -> {
                transaction.setStatus("FAILED");
                transaction.setDescription("Invalid transaction type");
                return transactionRepository.save(transaction);
            }
        }

        // Save updated account balance
        accountRepository.save(account);

        // Generate unique transaction ID
        transaction.setReferenceId("TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());

        return transactionRepository.save(transaction);
    }

    // Get all transactions by username
    public List<Transaction> getTransactionsByUsername(String username) {
        return transactionRepository.findByUsername(username);
    }

    // Get all transactions by account number
    public List<Transaction> getTransactionsByAccount(String accountNumber) {
        return transactionRepository.findByAccountNumber(accountNumber);
    }
}
