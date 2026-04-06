import { ShieldCheckIcon, ShieldAlertIcon, ShieldXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types/recipe.types";

interface SafetyBadgeProps {
  riskLevel: RiskLevel;
  className?: string;
}

const config: Record<RiskLevel, { icon: typeof ShieldCheckIcon; label: string; className: string }> = {
  GREEN: { icon: ShieldCheckIcon, label: "Safe", className: "bg-[#98C9A3] text-white" },
  AMBER: { icon: ShieldAlertIcon, label: "Caution", className: "bg-[#F4D06F] text-[#4A3B32]" },
  RED: { icon: ShieldXIcon, label: "High Risk", className: "bg-[#E88D72] text-white" },
  BLOCKED: { icon: ShieldXIcon, label: "Blocked", className: "bg-[#F7B2B7] text-[#4A3B32]" },
};

export function SafetyBadge({ riskLevel, className }: SafetyBadgeProps) {
  const { icon: Icon, label, className: colorClass } = config[riskLevel];

  return (
    <Badge variant="default" className={cn("gap-2 rounded-full font-black text-base px-4 py-1", colorClass, className)}>
      <Icon className="size-4" strokeWidth={3} />
      {label}
    </Badge>
  );
}
