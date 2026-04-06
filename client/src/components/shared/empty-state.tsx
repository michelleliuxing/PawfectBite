import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-[2.5rem] border-4 border-dashed border-[#4A3B32]/30 bg-[#FFF9F2] p-12 md:p-16 text-center">
      <div className="flex w-20 h-20 items-center justify-center rounded-full border-4 border-[#4A3B32] bg-[#F7B2B7] shadow-[4px_4px_0px_#4A3B32]">
        <Icon className="w-10 h-10 text-white" strokeWidth={3} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-[#4A3B32]">{title}</h3>
        <p className="mt-2 text-lg font-bold text-[#4A3B32]/70 max-w-md mx-auto">{description}</p>
      </div>
      {action}
    </div>
  );
}
