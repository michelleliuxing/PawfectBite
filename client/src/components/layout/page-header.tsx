import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#4A3B32]">{title}</h1>
          {description && (
            <p className="text-lg font-bold text-[#4A3B32]/70">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <Separator />
    </div>
  );
}
