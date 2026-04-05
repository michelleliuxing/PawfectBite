import { ShieldCheckIcon, ShieldAlertIcon, ShieldXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types/recipe.types";

interface SafetyBadgeProps {
  riskLevel: RiskLevel;
  className?: string;
}

const config: Record<RiskLevel, { icon: typeof ShieldCheckIcon; label: string; className: string }> = {
  GREEN: { icon: ShieldCheckIcon, label: "Safe", className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/10" },
  AMBER: { icon: ShieldAlertIcon, label: "Caution", className: "bg-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/10" },
  RED: { icon: ShieldXIcon, label: "High Risk", className: "bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/10" },
  BLOCKED: { icon: ShieldXIcon, label: "Blocked", className: "bg-red-600/15 text-red-800 border-red-600/20 hover:bg-red-600/15" },
};

export function SafetyBadge({ riskLevel, className }: SafetyBadgeProps) {
  const { icon: Icon, label, className: colorClass } = config[riskLevel];

  return (
    <Badge variant="outline" className={cn("gap-1.5 rounded-full font-semibold", colorClass, className)}>
      <Icon className="size-3.5" />
      {label}
    </Badge>
  );
}
