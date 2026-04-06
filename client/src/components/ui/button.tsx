import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-4 border-[#4A3B32] font-black transition-all outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 active:scale-95 active:translate-y-1 active:shadow-none hover:scale-105 hover:-translate-y-1",
  {
    variants: {
      variant: {
        default: "bg-[#98C9A3] text-white shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32]",
        destructive: "bg-[#E88D72] text-white shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32]",
        outline: "bg-white text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32] hover:bg-[#FFF9F2]",
        secondary: "bg-[#F4D06F] text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32]",
        ghost: "border-transparent text-[#4A3B32] hover:bg-[#FFF9F2] hover:border-[#4A3B32] hover:shadow-[4px_4px_0px_#4A3B32] active:shadow-none",
        link: "border-transparent text-[#4A3B32] underline-offset-4 hover:border-transparent hover:underline hover:scale-100 hover:translate-y-0 hover:shadow-none active:scale-100 active:translate-y-0",
      },
      size: {
        default: "h-12 px-6 py-2 text-lg",
        sm: "h-10 px-4 text-base",
        lg: "h-14 px-8 text-xl",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
