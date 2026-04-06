import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[120px] w-full rounded-2xl border-4 border-[#4A3B32] bg-white px-4 py-3 text-lg font-bold text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-all outline-none placeholder:text-[#4A3B32]/40 focus-visible:shadow-[6px_6px_0px_#4A3B32] focus-visible:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:bg-red-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
