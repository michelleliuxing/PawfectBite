import { Shield, ShieldAlert, ShieldX, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types/recipe.types";

interface SafetyBadgeProps {
  riskLevel: RiskLevel;
  className?: string;
}

const config: Record<RiskLevel, { icon: typeof Shield; label: string; colors: string }> = {
  GREEN: { icon: ShieldCheck, label: "Safe", colors: "bg-emerald-500/10 text-emerald-700" },
  AMBER: { icon: ShieldAlert, label: "Caution", colors: "bg-amber-500/10 text-amber-700" },
  RED: { icon: ShieldX, label: "High Risk", colors: "bg-red-500/10 text-red-700" },
  BLOCKED: { icon: ShieldX, label: "Blocked", colors: "bg-red-600/15 text-red-800" },
};

export function SafetyBadge({ riskLevel, className }: SafetyBadgeProps) {
  const { icon: Icon, label, colors } = config[riskLevel];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", colors, className)}>
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}
