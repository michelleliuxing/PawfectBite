package com.pawfectbite.server.safety.domain;

public enum RiskLevel {
    GREEN,
    AMBER,
    RED,
    BLOCKED;

    public RiskLevel escalate(RiskLevel other) {
        return this.ordinal() >= other.ordinal() ? this : other;
    }
}
