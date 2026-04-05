package com.pawfectbite.server.common.exception;

import java.util.List;

public class SafetyBlockedException extends AppException {

    private final List<String> reasons;

    public SafetyBlockedException(List<String> reasons) {
        super("SAFETY_BLOCKED", "Recipe generation blocked due to safety concerns");
        this.reasons = reasons;
    }

    public List<String> getReasons() {
        return reasons;
    }
}
