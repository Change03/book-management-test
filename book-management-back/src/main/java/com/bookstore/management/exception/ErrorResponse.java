package com.bookstore.management.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        int status,
        String error,
        String message,
        String path,
        LocalDateTime timestamp,
        Map<String, String> validation
) {

    public static ErrorResponse of(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path, LocalDateTime.now(), null);
    }

    public static ErrorResponse validation(String message, String path, Map<String, String> validation) {
        return new ErrorResponse(400, "BAD_REQUEST", message, path, LocalDateTime.now(), validation);
    }
}
