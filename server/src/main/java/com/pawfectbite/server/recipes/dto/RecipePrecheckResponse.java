package com.pawfectbite.server.recipes.dto;

import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyResult;
import com.pawfectbite.server.safety.domain.SafetyWarning;

import java.util.List;

public record RecipePrecheckResponse(
        RiskLevel riskLevel,
        List<WarningDto> warnings,
        boolean canProceed
) {
    public record WarningDto(String ruleType, String message, RiskLevel severity) {}

    public static RecipePrecheckResponse from(SafetyResult result) {
        List<WarningDto> warnings = result.warnings().stream()
                .map(w -> new WarningDto(w.ruleType(), w.message(), w.severity()))
                .toList();
        return new RecipePrecheckResponse(result.riskLevel(), warnings, result.canProceed());
    }
}
