package com.ecommerce.india.Payloads.Response;

import com.ecommerce.india.models.User;

public record LoginResponse(String token, User user) {

}
