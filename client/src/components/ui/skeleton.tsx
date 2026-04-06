import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-2xl bg-[#FFF9F2] border-4 border-[#4A3B32]/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
