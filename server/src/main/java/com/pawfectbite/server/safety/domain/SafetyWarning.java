package com.pawfectbite.server.safety.domain;

public record SafetyWarning(
        String ruleType,
        String message,
        RiskLevel severity
) {}
