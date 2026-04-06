import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border-4 border-[#4A3B32] px-3 py-1 text-sm font-black whitespace-nowrap transition-all shadow-[2px_2px_0px_#4A3B32]",
  {
    variants: {
      variant: {
        default: "bg-[#98C9A3] text-white",
        secondary: "bg-[#F4D06F] text-[#4A3B32]",
        destructive: "bg-[#E88D72] text-white",
        outline: "bg-white text-[#4A3B32]",
        ghost: "border-transparent bg-transparent text-[#4A3B32] shadow-none",
        link: "border-transparent bg-transparent text-[#4A3B32] underline shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
