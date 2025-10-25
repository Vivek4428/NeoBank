package com.example.neobank.repositories;

import com.example.neobank.models.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByUsername(String username);
    List<Transaction> findByAccountNumber(String accountNumber);
}
