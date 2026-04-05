package com.pawfectbite.server.safety.domain;

import java.util.List;

public record SafetyResult(
        RiskLevel riskLevel,
        List<SafetyWarning> warnings,
        boolean canProceed
) {
    public static SafetyResult safe() {
        return new SafetyResult(RiskLevel.GREEN, List.of(), true);
    }

    public static SafetyResult of(RiskLevel level, List<SafetyWarning> warnings) {
        boolean canProceed = level != RiskLevel.BLOCKED;
        return new SafetyResult(level, warnings, canProceed);
    }
}
