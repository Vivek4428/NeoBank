package com.example.neobank.services;

import com.example.neobank.dto.RegisterRequest;
import com.example.neobank.dto.UserDetailsRequest;
import com.example.neobank.models.User;
import com.example.neobank.repositories.UserRepository;
import com.example.neobank.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    // Register a new user
    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        return userRepository.save(user);
    }

    // Login user (authenticate)
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }

    // Update user details after initial registration
public User updateUserDetails(UserDetailsRequest request) {
    User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setAccountType(request.getAccountType());
    user.setInitialDeposit(request.getInitialDeposit());
    user.setChequebookRequired(request.getChequebookRequired());
    user.setEmailAlerts(request.getEmailAlerts());
    user.setSmsAlerts(request.getSmsAlerts());
    user.setDob(request.getDob());
    user.setGender(request.getGender());
    user.setPhone(request.getPhone());
    user.setCurrentAddress(request.getCurrentAddress());
    user.setPermanentAddress(request.getPermanentAddress());
    user.setCity(request.getCity());
    user.setState(request.getState());
    user.setPincode(request.getPincode());
    user.setAadhaarNumber(request.getAadhaarNumber());
    user.setPanNumber(request.getPanNumber());
    user.setSecurityQuestion(request.getSecurityQuestion());
    user.setSecurityAnswer(request.getSecurityAnswer());
    user.setRegistrationStatus("FULL_COMPLETED");

    return userRepository.save(user);
}

}
