"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * "card"   → calm frosted material for large content surfaces (default)
   * "chrome" → small floating controls; gets real SVG lensing on Chromium
   */
  variant?: "card" | "chrome"
  as?: React.ElementType
}

/**
 * The single reusable Liquid Glass surface. Replaces the old SpotlightWrapper.
 * Styling lives in globals.css (`.glass` / `.glass-chrome`) so the rim and
 * refraction stay consistent everywhere and respond to the global slider.
 */
export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ variant = "card", as: Tag = "div", className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn("glass", variant === "chrome" && "glass-chrome", className)}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

LiquidGlass.displayName = "LiquidGlass"
