package com.pawfectbite.server.common.exception;

public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(String resourceType, Object id) {
        super("NOT_FOUND", resourceType + " not found with id: " + id);
    }
}
