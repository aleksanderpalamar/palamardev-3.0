import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative py-3 sm:max-w-xl sm:mx-auto flex flex-col h-full",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-violet-400 to-light-violet-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
          )}
        ></div>
        <div className="relative px-4 py-10 bg-zinc-900 shadow-lg sm:rounded-3xl sm:p-20 flex-grow">
          {props.children}
        </div>
      </div>
    )
  }
)
Card.displayName = "Card"