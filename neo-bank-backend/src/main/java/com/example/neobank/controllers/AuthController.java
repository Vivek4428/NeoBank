package com.example.neobank.controllers;

import com.example.neobank.repositories.UserRepository;
import com.example.neobank.dto.AuthRequest;
import com.example.neobank.dto.RegisterRequest;
import com.example.neobank.dto.AuthResponse;
import com.example.neobank.dto.UserDetailsRequest;
import com.example.neobank.models.User;
import com.example.neobank.services.UserService;
import com.example.neobank.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtils jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // Register user (basic)
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        User user = userService.register(request);
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        AuthResponse response = new AuthResponse(token, user.getUsername(), user.getRole());
        return ResponseEntity.ok(response);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        User user = userService.login(request.getUsername(), request.getPassword());
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        AuthResponse response = new AuthResponse(token, user.getUsername(), user.getRole());
        return ResponseEntity.ok(response);
    }

    // Protected route test
    @GetMapping("/profile")
    public String getUserProfile() {
        return "Got accessed a protected route!";
    }

    // Update user details (after registration continuation form)
    @PostMapping("/update-details")
    public ResponseEntity<User> updateDetails(@RequestBody UserDetailsRequest request) {
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

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
