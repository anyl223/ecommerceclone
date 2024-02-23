package com.ecommerce.india.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.india.Payloads.Request.LoginRequest;
import com.ecommerce.india.Payloads.Request.SignUpReq;
import com.ecommerce.india.Payloads.Response.LoginResponse;
import com.ecommerce.india.models.User;
import com.ecommerce.india.repositories.UserRepo;
import com.ecommerce.india.services.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  UserRepo userRepo;

  @Autowired
  UserService userService;


  @PostMapping("/login")
  public <json> LoginResponse handleLoginForm(
      @Valid @RequestBody LoginRequest loginRequest) throws Exception {
    String username = loginRequest.username();
    String password = loginRequest.password();
    String fp = loginRequest.fp();
    User user = userService.authenticateUser(username, password);
    String jwt = userService.generateJwt(user, fp);
    return new LoginResponse(jwt, user);
  }

  @PostMapping("/register")
  public String handleRegisterForm(@RequestBody SignUpReq signupreq) {
    String username = signupreq.username();
    String password = signupreq.password();
    String confirmpassword = signupreq.confirmPassword();
    String email = signupreq.email();
    String mobile = signupreq.mobile();
    String gender = signupreq.gender();
    String displayname = signupreq.displayName();

    User user = new User();
    user.setUsername(username);
    user.setPassword(password);
    user.setConfirmPassword(confirmpassword);
    user.setMobile(mobile);
    user.setGender(gender);
    user.setDisplayName(displayname);
    user.setEmail(email);
    userRepo.save(user);
    return "Registered";
  }

}
