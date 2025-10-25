package com.example.neobank.repositories;

import com.example.neobank.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account, String> {
    Optional<Account> findByUsername(String username);
    Optional<Account> findByAccountNumber(String accountNumber);
}
