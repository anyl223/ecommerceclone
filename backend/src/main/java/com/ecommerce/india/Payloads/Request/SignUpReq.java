package com.ecommerce.india.Payloads.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignUpReq(@NotBlank @Size(min = 3, max = 30) String username,
    @NotBlank @Size(min = 3, max = 20) String password,
    @NotBlank @Size(min = 3, max = 20) String confirmPassword,
    @NotBlank @Size(min = 3, max = 50) String email, String mobile, String gender,
    String displayName) {

}

