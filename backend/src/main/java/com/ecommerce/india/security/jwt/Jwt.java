package com.ecommerce.india.security.jwt;

public record Jwt(String subject, String fp, long timestamp) {}
