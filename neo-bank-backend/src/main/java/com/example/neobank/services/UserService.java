package com.example.neobank.services;

import com.example.neobank.dto.RegisterRequest;
import com.example.neobank.dto.UserDetailsRequest;
import com.example.neobank.models.User;
import com.example.neobank.models.Account;
import com.example.neobank.repositories.UserRepository;
import com.example.neobank.repositories.AccountRepository;
import com.example.neobank.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    // Register a new user
    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Save to users collection
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        userRepository.save(user);

        // Create linked account with basic info
        Account account = new Account();
        account.setUsername(user.getUsername());
        account.setEmail(user.getEmail());
        account.setFullName(user.getFullName());
        account.setPassword(user.getPassword()); // hashed password
        account.setAccountNumber("NEO" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        account.setBalance(0.0);
        account.setInitialDeposit(0.0);
        account.setRegistrationStatus("BASIC_REGISTERED");

        accountRepository.save(account);

        return user;
    }

    // Login
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }

    // Update / Complete user details
    public Account updateUserDetails(UserDetailsRequest request) {
        Account account = accountRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setAccountType(request.getAccountType());
        account.setInitialDeposit(request.getInitialDeposit());
        account.setBalance(request.getInitialDeposit());
        account.setChequebookRequired(request.getChequebookRequired());
        account.setEmailAlerts(request.getEmailAlerts());
        account.setSmsAlerts(request.getSmsAlerts());
        account.setDob(request.getDob());
        account.setGender(request.getGender());
        account.setPhone(request.getPhone());
        account.setCurrentAddress(request.getCurrentAddress());
        account.setPermanentAddress(request.getPermanentAddress());
        account.setCity(request.getCity());
        account.setState(request.getState());
        account.setPincode(request.getPincode());
        account.setAadhaarNumber(request.getAadhaarNumber());
        account.setPanNumber(request.getPanNumber());
        account.setSecurityQuestion(request.getSecurityQuestion());
        account.setSecurityAnswer(request.getSecurityAnswer());
        account.setRegistrationStatus("FULL_COMPLETED");

        return accountRepository.save(account);
    }

    // Get user account details
    public Optional<Account> getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    // Get JWT Token
    public String generateToken(String username, String role) {
        return jwtUtils.generateToken(username, role);
    }

}
