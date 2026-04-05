package com.pawfectbite.server.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        T data,
        ApiError error,
        Meta meta
) {
    public record ApiError(String code, String message) {}
    public record Meta(Instant timestamp) {}

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data, null, new Meta(Instant.now()));
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        return new ApiResponse<>(null, new ApiError(code, message), new Meta(Instant.now()));
    }
}
