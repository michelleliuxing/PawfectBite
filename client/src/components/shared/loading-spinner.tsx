import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  message?: string;
  color?: "default" | "yellow" | "green" | "pink" | "orange";
}

const colorMap = {
  default: "border-t-[#4A3B32]",
  yellow: "border-t-[#F4D06F]",
  green: "border-t-[#98C9A3]",
  pink: "border-t-[#F7B2B7]",
  orange: "border-t-[#E88D72]",
};

export function LoadingSpinner({ className, message = "Loading...", color = "pink" }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 gap-6", className)}>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className={cn(
          "w-16 h-16 border-8 border-[#4A3B32] rounded-full",
          colorMap[color]
        )}
      />
      {message && (
        <p className="font-black text-xl text-[#4A3B32] bg-white px-6 py-2 rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]">
          {message}
        </p>
      )}
    </div>
  );
}
